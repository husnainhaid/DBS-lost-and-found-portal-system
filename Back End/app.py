from flask import Flask
from routes import item_bp
import os

def create_app():
    """
    Flask application factory.
    Sets up the API blueprint and ensures the instance folder exists.
    """
    app = Flask(__name__, instance_relative_config=True)