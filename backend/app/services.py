# import pandas as pd
from datetime import datetime
from decimal import Decimal

def normalizar_linha(linha: dict) -> dict | None:
  try:
    # Banco do Brasil - Formato 1
    if 'Lan�amento' in linha or 'Tipo Lan�amento' in linha:
      if linha.get('Lan�amento') in ['Saldo do dia', 'Saldo Anterior', 'S A L D O']:
        return None
      return {
        'data': datetime.strptime(linha['Data'], '%d/%m/%Y').date(),
        'tipo_lancamento': linha.get('Tipo Lan�amento', '').strip() or 'Desconhecido',
        'valor': Decimal(
          linha['Valor'].replace('.', '').replace(',', '.')
        ),
        'doc_destinatario': '',
        'nome_destinatario': linha.get('Detalhes') or '',
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