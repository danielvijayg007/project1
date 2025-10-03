from database_nosql import db

def create_user_profile(user_id: int, name: str, age: int):
    """Create a new profile dynamically"""
    db.profiles.insert_one({"user_id": user_id, "name": name, "age": age})

def get_user_profile(user_id: int):
    """Fetch profile dynamically by user ID"""
    return db.profiles.find_one({"user_id": user_id}, {"_id": 0})
