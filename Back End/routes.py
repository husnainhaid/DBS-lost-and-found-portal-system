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
