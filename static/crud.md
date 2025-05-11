from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
# from jose import JWTError, jwt
from datetime import datetime, timedelta
from .core.config import get_settings
from .database import get_db
# from passlib.context import CryptContext

settings = get_settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_video(db: Session, video_id: str):
    return db.query(models.Video).filter(models.Video.video_id == video_id).first()

def get_videos(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Video).offset(skip).limit(limit).all()

def create_video(db: Session, video: schemas.VideoCreate):
    db_video = models.Video(**video.dict())
    db.add(db_video)
    db.commit()
    db.refresh(db_video)
    return db_video

def update_video(db: Session, video_id: str, video: schemas.VideoUpdate):
    db_video = db.query(models.Video).filter(models.Video.video_id == video_id).first()
    if db_video:
        update_data = video.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_video, key, value)
        db.commit()
        db.refresh(db_video)
    return db_video

def delete_video(db: Session, video_id: str):
    db_video = db.query(models.Video).filter(models.Video.video_id == video_id).first()
    if db_video:
        db.delete(db_video)
        db.commit()
    return db_video

def get_user(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

# def authenticate_user(db: Session, username: str, password: str):
#     user = get_user(db, username)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
#     return encoded_jwt

# def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = schemas.TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

# def get_current_active_user(current_user: models.User = Depends(get_current_user)):
#     if not current_user.is_active:
#         raise HTTPException(status_code=400, detail="Inactive user")
#     return current_user

# def get_user_by_paddle_customer_id(db: Session, paddle_customer_id: str):
#     return db.query(models.User).filter(models.User.paddle_customer_id == paddle_customer_id).first()

# def get_subscription_by_paddle_id(db: Session, paddle_subscription_id: str):
#     return db.query(models.Subscription).filter(models.Subscription.paddle_subscription_id == paddle_subscription_id).first()