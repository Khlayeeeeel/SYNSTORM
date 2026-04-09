from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
from app.schemas.base import PyObjectId

class ChildBase(BaseModel):
    user_id: str
    age: Optional[int] = None
    classe: Optional[str] = Field(None, description="Class name")
    parent_id: Optional[str] = Field(None, description="FK to Parent User ID")
    teacher_id: Optional[str] = Field(None, description="FK to Teacher User ID")
    bracelet_id: Optional[str] = Field(None, description="IoT Bracelet ID")
    psychiatre_id: Optional[str] = Field(None, description="FK to Psychiatrist User ID")
    chatbot_session_id: Optional[str] = Field(None, description="Chatbot Session ObjectId")

class ChildCreate(ChildBase):
    pass

class ChildDB(ChildBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )

class ChildResponse(ChildBase):
    id: PyObjectId = Field(alias="_id")
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_encoders={PyObjectId: str}
    )

class ChildUpdate(BaseModel):
    age: Optional[int] = None
    classe: Optional[str] = None
    parent_id: Optional[str] = None
    teacher_id: Optional[str] = None
    bracelet_id: Optional[str] = None
    psychiatre_id: Optional[str] = None
    chatbot_session_id: Optional[str] = None
