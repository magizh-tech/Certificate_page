import os
import hashlib
from datetime import datetime, timedelta
from typing import Union, Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Configuration
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-key-magizh-tech-2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    try:
        return pwd_context.hash(password)
    except Exception:
        # Secure fallback to SHA-256 if bcrypt C-extensions are not fully loaded/compiled
        salt = "magizh_salt_hash_2026_"
        return "sha256:" + hashlib.sha256((salt + password).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if hashed_password.startswith("sha256:"):
        salt = "magizh_salt_hash_2026_"
        expected = "sha256:" + hashlib.sha256((salt + plain_password).encode('utf-8')).hexdigest()
        return expected == hashed_password
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # Fallback verification check in case bcrypt fails
        salt = "magizh_salt_hash_2026_"
        expected = "sha256:" + hashlib.sha256((salt + plain_password).encode('utf-8')).hexdigest()
        return expected == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_access_token(token: str) -> Optional[dict]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
