from database import get_db


def get_all_items():
    """
    Returns all lost-and-found items as a list of dictionaries.
    """
    db = get_db()
    items = db.execute("SELECT * FROM items").fetchall()
    db.close()
    return [dict(row) for row in items]

def create_item(data):
    """
    Inserts a new lost item record into the database.
    """
    db = get_db()
    db.execute("""
        INSERT INTO items 
        (student_name, student_email, item_name, description, location_found, date_found, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        data["student_name"],
        data["student_email"],
        data["item_name"],
        data.get("description", ""),
        data["location_found"],
        data["date_found"],
        "unclaimed"
    ))

    
    db.commit()
    db.close()
def get_item_by_id(item_id):
    db = get_db()
    row = db.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
    db.close()
    return dict(row) if row else None
    