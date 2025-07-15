# import pandas as pd
from datetime import datetime
from decimal import Decimal
import re

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
      if linha.get('Lan�amento') in ['Saldo do dia', 'Saldo Anterior', 'S A L D O'] | linha.get('Lan�amento') in ['Rejeitado']:
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