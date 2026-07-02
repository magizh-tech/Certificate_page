import uuid
import datetime
from sqlalchemy import Column, String, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship

try:
    from .database import Base
except ImportError:
    from database import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="hr")  # roles: super_admin, hr, finance
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    documents = relationship("Document", back_populates="issuer")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    document_type = Column(String, nullable=False)  # 'experience', 'internship', 'offer_letter', 'relieving_letter', 'receipt'
    recipient_name = Column(String, nullable=False)
    recipient_email = Column(String, nullable=True)
    issued_by = Column(String, ForeignKey("users.id"), nullable=True)
    issue_date = Column(String, nullable=False)  # Store as YYYY-MM-DD
    status = Column(String, default="active")    # active, revoked
    metadata_json = Column(JSON, nullable=True)   # flexible dynamic payload for varying document types
    unique_hash = Column(String, unique=True, index=True, default=lambda: str(uuid.uuid4()))
    pdf_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    issuer = relationship("User", back_populates="documents")
