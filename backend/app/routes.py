from flask import Blueprint, request, jsonify
from . import db
from .models import Extrato
from .services import limpar_dados, procurar_cnpj
import uuid
from datetime import datetime
from sqlalchemy import func, case

main = Blueprint('main', __name__)

@main.route("/")
def home():
  return jsonify({"message": "API Flask funcionando!"})

@main.route("/api/extrato", methods=["POST"])
def receber_extrato():
  try:
    dados_brutos = request.get_json()
    dados_limpos = limpar_dados(dados_brutos)

    extratos = []
    for linha in dados_limpos:
      extrato = Extrato(
        data=linha['data'],
        tipo_lancamento=linha['tipo_lancamento'],
        valor=linha['valor'],
        doc_destinatario=linha.get('doc_destinatario'),
        nome_destinatario=linha.get('nome_destinatario'),
        usuario_id='f45b387a-fa8f-4b3c-81c4-c9ab898d36b9',
        arquivo_id=linha.get('arquivo_id')
      )
      extratos.append(extrato)
    
    db.session.add_all(extratos)
    db.session.commit()

    return jsonify({"status": "sucesso", "mensagem": "Dados processados com sucesso!"}), 200

  except Exception as e:
    return jsonify({"status": "erro", "mensagem": "Erro ao processar os dados"}), 400

@main.route("/api/extrato/<arquivo_id>", methods=["DELETE"])
def deletar_extrato(arquivo_id):
  try:
    delete = Extrato.query.filter_by(arquivo_id=arquivo_id).delete()
    db.session.commit()
    return jsonify({"status": "sucesso", "mensagem": f"{delete} registros removidos."}), 200
  
  except Exception as e:
    db.session.rollback()
    return jsonify({"status": "erro", "mensagem": "Erro ao deletar os registros"}), 500

@main.route("/api/extrato/dashboard", methods=["GET"])
def dashboard_extratos():
  try:
    # Entradas
    total_entradas = db.session.query(
      func.sum(Extrato.valor)
    ).filter(Extrato.tipo_lancamento == "Entrada").scalar() or 0

    # Saídas
    total_saidas = db.session.query(
      func.sum(Extrato.valor)
    ).filter(Extrato.tipo_lancamento == "Saída").scalar() or 0

    # Saldo final
    saldo_atual = total_entradas - total_saidas

    # Categoria do gasto (Se possível)
    saidas = Extrato.query.filter(Extrato.tipo_lancamento == "Saída").all()
    categorias = {}
    for saida in saidas:
      if saida.doc_destinatario:
        categoria = procurar_cnpj(saida.doc_destinatario)
      else:
        categoria = "Outros"   
      if categoria not in categorias:
        categorias[categoria] = {"quantidade": 0, "total": 0.0}

      categorias[categoria]["quantidade"] += 1
      categorias[categoria]["total"] += float(saida.valor)

    categorias_gastos = [
      {
        "categoria": cat,
        "quantidade": info["quantidade"],
        "total": info["total"]
      }
      for cat, info in categorias.items()
    ]

    # Resumo por mês
    resumo_por_mes = db.session.query(
      func.strftime("%Y-%m", Extrato.data).label("mes"),
      func.sum(case((Extrato.tipo_lancamento == "Entrada", Extrato.valor), else_=0)).label("entradas"),
      func.sum(case((Extrato.tipo_lancamento == "Saída", Extrato.valor), else_=0)).label("saidas"),
    ).group_by("mes").order_by("mes").all()

    resumo_json = [
      {
        "mes": mes,
        "entradas": float(entradas),
        "saidas": float(saidas),
        "saldo_mes": float(entradas - saidas)
      }
      for mes, entradas, saidas in resumo_por_mes
    ]

    return jsonify({
      "total_entradas": float(total_entradas),
      "total_saidas": float(total_saidas),
      "saldo_atual": float(saldo_atual),
      "resumo_por_mes": resumo_json,
      "categoria_gasto": categorias_gastos
    }), 200

  except Exception as e:
    print("Erro ao gerar dashboard:", e)
    return jsonify({"status": "erro", "mensagem": "Erro ao buscar dados"}), 500