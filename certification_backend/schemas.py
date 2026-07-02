from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class UserBase(BaseModel):
    email: str
    name: str
    role: str  # super_admin, hr, finance

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: str
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True

class DocumentBase(BaseModel):
    document_type: str  # 'experience', 'internship', 'offer_letter', 'relieving_letter', 'receipt'
    recipient_name: str
    recipient_email: Optional[str] = None
    issue_date: str     # YYYY-MM-DD
    metadata_json: Optional[Dict[str, Any]] = None

class DocumentCreate(DocumentBase):
    pass

class DocumentResponse(DocumentBase):
    id: str
    issued_by: Optional[str] = None
    status: str
    unique_hash: str
    pdf_url: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None
