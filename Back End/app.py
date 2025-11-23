from flask import Flask
from routes import item_bp
import os

def create_app():
    """
    Flask application factory.
    Registers API routes and prepares the backend.
    """
    app = Flask(__name__, instance_relative_config=True)

    # Ensure instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Register API blueprint
    app.register_blueprint(item_bp, url_prefix="/api")

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)