from database import get_db


def get_all_items():
    """
    Returns all lost-and-found items as a list of dictionaries.
    """
    db = get_db()
    items = db.execute("SELECT * FROM items").fetchall()
    db.close()
    return [dict(row) for row in items]