from flask import Blueprint, request, jsonify
from . import db
from .models import Extrato
from .services import limpar_dados
import uuid
from datetime import datetime

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
        usuario_id='f45b387a-fa8f-4b3c-81c4-c9ab898d36b9'
      )
      extratos.append(extrato)
    
    db.session.add_all(extratos)
    db.session.commit()

    return jsonify({"status": "sucesso", "mensagem": "Dados processados com sucesso!"}), 200

  except Exception as e:
    return jsonify({"status": "erro", "mensagem": "Erro ao processar os dados"}), 400