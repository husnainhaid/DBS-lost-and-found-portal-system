import sqlite3
import os

# SQLite database path inside /instance folder
DB_PATH = os.path.join("instance", "items.db")


def get_db():
    """
    Creates a connection to the SQLite database.
    Enables row_factory so results are dict-like.
    """
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def check_connection():
    """
    Checks if the database can be connected successfully.
    Returns True if connection is OK.
    """
    try:
        conn = get_db()
        conn.execute("SELECT 1")
        conn.close()
        return True
    except Exception:
        return False