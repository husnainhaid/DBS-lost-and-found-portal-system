from flask import Blueprint, request, jsonify
import models

# Create a blueprint for item-related API routes
item_bp = Blueprint("item_bp", __name__)

# -----------------------------------------------------------
# GET all items (Read)
# -----------------------------------------------------------
@item_bp.route("/items", methods=["GET"])
def get_items():
    """
    Returns a list of all lost & found items.
    """
    items = models.get_all_items()
    return jsonify(items), 200


# -----------------------------------------------------------
# POST a new item (Create)
# -----------------------------------------------------------
@item_bp.route("/items", methods=["POST"])
def create_item():
    """
    Creates a new lost item entry in the database.
    Expects JSON data with student_name, student_email, item_name,
    description, location_found, and date_found.
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    models.create_item(data)
    return jsonify({"message": "Item created successfully"}), 201Implemented routes.py with structured Flask API endpoints for items including GET, POST, PUT, and DELETE
