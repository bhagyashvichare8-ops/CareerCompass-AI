from fastapi import APIRouter
from pydantic import BaseModel
from database import SessionLocal
from models import User as UserDB
from passlib.context import CryptContext
from auth import create_access_token
from fastapi import Header
from auth import verify_token
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()
security = HTTPBearer()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(BaseModel):
    name:str
    email:str
    password:str

@router.post("/register")
def register(user:User):

    db = SessionLocal()

    hashed_password = pwd_context.hash(user.password)

    new_user = UserDB(name=user.name, email=user.email, password=hashed_password)

    db.add(new_user)
    db.commit()
    db.close()

    return {"message":"User registered successfully!", "user":user}

class LoginUser(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(user:LoginUser):

    db = SessionLocal()

    db_user = db.query(UserDB).filter(UserDB.email == user.email).first()

    db.close()

    if db_user is None:
        return {"message":"User not found"}
    
    if not pwd_context.verify(user.password, db_user.password):
        return {"message":"Incorrect password"}
    
    access_token = create_access_token(data={"sub": db_user.email})

    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me")
def get_me(credentials: HTTPAuthorizationCredentials = Depends(security)):

    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:
        return {"message": "Invalid token"}

    db = SessionLocal()

    db_user = db.query(UserDB).filter(UserDB.email == payload["sub"]).first()

    db.close()

    if db_user is None:
        return {"message": "User not found"}

    return {
        "id": db_user.id,
        "name": db_user.name,
        "email": db_user.email
    }