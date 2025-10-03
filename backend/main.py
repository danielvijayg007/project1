from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database_sql import SessionLocal, engine, Base
from models_sql import User
from models_nosql import create_user_profile
from auth import hash_password, verify_password, create_access_token
from schemas import UserCreate, UserLogin
from fastapi.middleware.cors import CORSMiddleware

# Create all SQL tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = hash_password(user.password)
    new_user = User(email=user.email, hashed_password=hashed_pwd)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    create_user_profile(new_user.id, user.name, user.age)
    return {"message": "User created successfully"}

@app.post("/signin")
def signin(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"user_id": db_user.id})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/profile/{user_id}")
def get_profile(user_id: int):
    profile = get_user_profile(user_id)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

