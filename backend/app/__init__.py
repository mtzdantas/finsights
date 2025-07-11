from flask import Flask
from flask_cors import CORS

def create_app():
  app = Flask(__name__)
  CORS(app) # Libera todas as origens (ajustável depois para segurança)

  # Aqui você registra as rotas em outro módulo
  from .routes import main
  app.register_blueprint(main)
  return app