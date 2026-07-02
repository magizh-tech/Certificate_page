import os
import datetime
from fastapi import FastAPI, Depends, HTTPException, status, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from typing import List, Optional

try:
    from .database import engine, Base, get_db
    from . import models, schemas, auth
except ImportError:
    from database import engine, Base, get_db
    import models, schemas, auth

# Create database tables if they do not exist
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Magizh Tech Document Portal API")

# Configure CORS so React frontend can fetch backend resources
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT Auth security dependency
api_key_header = APIKeyHeader(name="Authorization", auto_error=False)

def get_current_user(token: str = Depends(api_key_header), db: Session = Depends(get_db)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exception
    
    # Strip 'Bearer ' if present
    if token.startswith("Bearer "):
        token = token[7:]
        
    payload = auth.decode_access_token(token)
    if payload is None:
        raise credentials_exception
        
    email: str = payload.get("sub")
    if email is None:
        raise credentials_exception
        
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Seed default admin user on startup
@app.on_event("startup")
def seed_default_admin():
    db = next(get_db())
    try:
        admin_email = os.getenv("VITE_ADMIN_USERNAME", "admin@magizhtechnologies.com")
        # Support fallback plain "admin" if that's what was in client code
        if "@" not in admin_email:
            admin_email = "admin@magizhtechnologies.com"
            
        admin_user = db.query(models.User).filter(models.User.email == admin_email).first()
        if not admin_user:
            default_pwd = os.getenv("VITE_ADMIN_PASSWORD", "admin123")
            hashed = auth.hash_password(default_pwd)
            db_admin = models.User(
                name="Magizh Admin",
                email=admin_email,
                password_hash=hashed,
                role="super_admin"
            )
            db.add(db_admin)
            db.commit()
            print(f"Default admin seeded successfully: {admin_email}")
    except Exception as e:
        print(f"Error seeding default admin: {e}")
    finally:
        db.close()

# Routes
@app.post("/api/auth/register", response_model=schemas.UserResponse)
def register_user(
    user_in: schemas.UserCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    # Only super_admin can register new HR/Finance users
    if current_user.role != "super_admin":
        raise HTTPException(status_code=403, detail="Not authorized to register users")
        
    existing_user = db.query(models.User).filter(models.User.email == user_in.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed = auth.hash_password(user_in.password)
    new_user = models.User(
        name=user_in.name,
        email=user_in.email,
        password_hash=hashed,
        role=user_in.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/api/auth/token", response_model=schemas.Token)
def login_for_access_token(login_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == login_data.email).first()
    
    # Also support searching by name if user entered a username instead of email
    if not user:
        user = db.query(models.User).filter(models.User.name == login_data.email).first()
        
    # Support checking against default credentials directly if email is 'admin' for ease of migration
    if not user and login_data.email == "admin":
        user = db.query(models.User).filter(models.User.role == "super_admin").first()
        
    if not user or not auth.verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email/username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = auth.create_access_token(data={"sub": user.email, "role": user.role})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=schemas.UserResponse)
def read_users_me(current_user: models.User = Depends(get_current_user)):
    return current_user

# Document Endpoints
@app.post("/api/documents", response_model=schemas.DocumentResponse)
def create_document(
    doc_in: schemas.DocumentCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Save the document metadata and content
    new_doc = models.Document(
        document_type=doc_in.document_type,
        recipient_name=doc_in.recipient_name,
        recipient_email=doc_in.recipient_email,
        issued_by=current_user.id,
        issue_date=doc_in.issue_date,
        metadata_json=doc_in.metadata_json,
    )
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return new_doc

@app.get("/api/documents", response_model=List[schemas.DocumentResponse])
def get_documents(
    document_type: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    query = db.query(models.Document)
    if document_type:
        query = query.filter(models.Document.document_type == document_type)
    # Order by creation date descending
    return query.order_by(models.Document.created_at.desc()).all()

# Public Verification Endpoints (No Auth Required)
@app.get("/api/public/verify/{hash_or_id}", response_model=schemas.DocumentResponse)
def verify_document(hash_or_id: str, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(
        (models.Document.id == hash_or_id) | 
        (models.Document.unique_hash == hash_or_id)
    ).first()
    
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found or invalid signature")
    return doc

@app.get("/api/public/qr/{hash_or_id}")
def get_verification_qr(hash_or_id: str, db: Session = Depends(get_db)):
    doc = db.query(models.Document).filter(
        (models.Document.id == hash_or_id) | 
        (models.Document.unique_hash == hash_or_id)
    ).first()
    
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
        
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
    verify_url = f"{frontend_url}/verify/{doc.unique_hash}"
    
    # Try generating using python-qrcode if available
    try:
        import qrcode
        import io
        from fastapi.responses import StreamingResponse
        
        qr = qrcode.QRCode(version=1, box_size=10, border=1)
        qr.add_data(verify_url)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        buf = io.BytesIO()
        try:
            kwargs = {"format": "PNG"}
            img.save(buf, **kwargs)
        except TypeError:
            img.save(buf)
        buf.seek(0)
        return StreamingResponse(buf, media_type="image/png")
    except Exception:
        # Fallback to redirecting to public QR generator API (works out of the box with zero setup)
        from fastapi.responses import RedirectResponse
        import urllib.parse
        encoded_url = urllib.parse.quote(verify_url)
        return RedirectResponse(url=f"https://api.qrserver.com/v1/create-qr-code/?size=250x250&data={encoded_url}")
