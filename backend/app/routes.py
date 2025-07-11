from flask import Blueprint, request, jsonify

main = Blueprint('main', __name__)

@main.route("/")
def home():
  return jsonify({"message": "API Flask funcionando!"})

@main.route("/api/extrato", methods=["POST"])
def receber_extrato():
  try:
    dados = request.get_json()
    print("Dados recebidos do frontend:")
    for linha in dados:
      print(linha)

    return jsonify({"status": "sucesso", "mensagem": "Dados recebidos com sucesso!"}), 200

  except Exception as e:
    print("❌ Erro ao processar os dados:", e)
    return jsonify({"status": "erro", "mensagem": "Erro ao receber os dados"}), 400