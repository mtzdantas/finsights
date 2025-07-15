from datetime import datetime
from decimal import Decimal
import re
import requests

def extrair_doc_e_nome(detalhes: str) -> tuple[str, str]:
  if not detalhes:
    return "", ""

  match = re.search(r"(\d{11,14})\s+(.+)", detalhes)
  if match:
    documento = match.group(1)
    nome = match.group(2).strip()
    return documento, nome
    
  return "", detalhes

def normalizar_linha(linha: dict) -> dict | None:
  try:
    # Banco do Brasil - Formato 1
    if 'Lan�amento' in linha or 'Tipo Lan�amento' in linha:

      if linha.get('Lan�amento') in ['Saldo do dia', 'Saldo Anterior', 'S A L D O', 'Rejeitado']:
        return None
      
      tipo_lancamento = linha.get('Tipo Lan�amento', '').strip()
      if tipo_lancamento == 'Sa�da':
        tipo_lancamento = 'Saída'
      elif not tipo_lancamento:
        tipo_lancamento = 'Desconhecido'
      
      detalhes = linha.get('Detalhes', '')
      doc_destinatario, nome_destinatario = extrair_doc_e_nome(detalhes)

      return {
        'data': datetime.strptime(linha['Data'], '%d/%m/%Y').date(),
        'tipo_lancamento': tipo_lancamento,
        'valor': Decimal(
          linha['Valor'].replace('.', '').replace(',', '.')
        ),
        'doc_destinatario': doc_destinatario,
        'nome_destinatario': nome_destinatario,
        'arquivo_id': str(linha['arquivo_id']),
      }

    # Nubank - Formato 2
    elif 'Identificador' in linha and 'Descrição' in linha:
      valor = linha['Valor'].replace(',', '.')
      valor = Decimal(valor)

      descricao = linha.get('Descrição', '')
      partes = descricao.split(" - ")

      nome = ''
      doc = ''

      if len(partes) >= 3:
        nome = partes[1].strip().title()
        doc = partes[2].strip()

      return {
        'data': datetime.strptime(linha['Data'], '%d/%m/%Y').date(),
        'tipo_lancamento': 'Entrada' if valor >= 0 else 'Saída',
        'valor': abs(valor),
        'doc_destinatario': doc,
        'nome_destinatario': nome,
        'arquivo_id': str(linha['arquivo_id']),
      }

    else:
      print(f"Linha em formato desconhecido: {linha}")
      return None

  except Exception as e:
    print(f"Erro ao normalizar linha: {linha} -> {e}")
    return None

def limpar_dados(dados_brutos: list[dict]) -> list[dict]:
  dados_limpos = []
  for linha in dados_brutos:
    normalizada = normalizar_linha(linha)
    if normalizada:
      dados_limpos.append(normalizada)

  # Fazer limpeza com pandas
  # df = pd.DataFrame(dados_limpos)

  limpos = dados_limpos
  return limpos

CNPJ_CACHE = {}

def procurar_cnpj(doc: str) -> str:
  doc = ''.join(filter(str.isdigit, doc))

  if len(doc) != 14:
    return "Outros"

  if doc in CNPJ_CACHE:
    return CNPJ_CACHE[doc]
  
  try:
    url = f"https://www.receitaws.com.br/v1/cnpj/{doc}"
    resp = requests.get(url, timeout=10)

    if resp.status_code != 200:
      return "Outros"
    
    data = resp.json()

    atividade = data.get("atividade_principal", [])
    ramo_texto = atividade[0]["text"] if atividade else ""

    categoria = categorizar_atividade(ramo_texto)

    CNPJ_CACHE[doc] = categoria
    return categoria

  except Exception as e:
    print(f"Erro ao consultar CNPJ {doc}: {e}")
    return "Outros" 

def categorizar_atividade(ramo: str) -> str:
  if not ramo:
    return "Outros"

  ramo_lower = ramo.lower()

  categorias_keywords = {
    "Alimentação": [
      "supermercado", "mercado", "padaria", "açougue", "hortifruti",
      "alimentos", "mercearia", "sacolão"
    ],
    "Saúde": [
      "farmácia", "medicamentos", "hospital", "clínica", "saúde",
      "laboratório", "análises clínicas", "consultório"
    ],
    "Transporte": [
      "posto", "combustível", "gasolina", "transportes", "locadora",
      "táxi", "uber", "logística", "rodoviário"
    ],
    "Educação": [
      "educação", "escola", "faculdade", "universidade",
      "cursos", "treinamento", "idiomas"
    ],
    "Restaurantes": [
      "restaurante", "bar", "lanchonete", "cafeteria", "churrascaria",
      "pizzaria", "fast food", "food truck"
    ],
    "Vestuário": [
      "roupas", "confecções", "moda", "calçados", "vestuário",
      "loja de roupas", "boutique"
    ],
    "Tecnologia": [
      "informática", "software", "hardware", "tecnologia",
      "computadores", "celulares", "eletrônicos"
    ],
    "Lazer": [
      "cinema", "parque", "viagem", "hotel", "pousada",
      "turismo", "entretenimento"
    ],
    "Beleza e Estética": [
      "cabeleireiro", "salão de beleza", "manicure", "pedicure",
      "estética", "barbearia", "spa"
    ]
  }

  for categoria, keywords in categorias_keywords.items():
    if any(keyword in ramo_lower for keyword in keywords):
      return categoria

  return "Outros"