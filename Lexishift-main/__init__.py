from flask import Flask
import os

def create_app():
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'static'), static_url_path='/static')
   
    from app.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    return app



