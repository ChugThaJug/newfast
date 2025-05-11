from sqlalchemy import Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..app.database import Base

class Video(Base):
    __tablename__ = "videos"

    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(String(16), unique=True, index=True)
    title = Column(String(128), index=True)
    author = Column(String(64), index=True)
    duration = Column(String)
    description = Column(Text)
    thumbnail_url = Column(String(1024))
    summary = Column(Text)
    total_tokens = Column(Integer)
    total_price = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    paddle_customer_id = Column(String, unique=True, nullable=True)
    is_subscribed = Column(Boolean, default=False)
    subscription_type = Column(String, nullable=True)
    paddle_subscription_id = Column(String, unique=True, nullable=True)

    subscriptions = relationship("Subscription", back_populates="user")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    paddle_subscription_id = Column(String, unique=True, index=True)
    paddle_plan_id = Column(String)
    status = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="subscriptions")