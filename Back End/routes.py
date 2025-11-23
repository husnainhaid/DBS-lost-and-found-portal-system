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
@item_bp.route("/health", methods=["GET"])
def health():
    return {"status1": "backend running"}, 200

def search_items(keyword):
    db = get_db()
    rows = db.execute("""
        SELECT * FROM items
        WHERE item_name LIKE ? OR description LIKE ? OR location_found LIKE ?
    """, (f"%{keyword}%", f"%{keyword}%", f"%{keyword}%")).fetchall()
    db.close()
    return [dict(row) for row in rows]





