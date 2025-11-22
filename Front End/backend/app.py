from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

@app.route("/api/test", methods=["GET"])
def test_api():
    return jsonify({"message": "Backend API is running"}), 200