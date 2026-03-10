from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
import models
import schemas
import auth
from database import SessionLocal, engine
from typing import List
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    try:
        from jose import jwt, JWTError
        payload = jwt.decode(token, auth.SECRET_KEY,
                             algorithms=[auth.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401)
    except JWTError:
        raise HTTPException(status_code=401)
    user = db.query(models.UserModel).filter(
        models.UserModel.email == email).first()
    if user is None:
        raise HTTPException(status_code=401)
    return user


@app.get("/deadlines", response_model=List[schemas.Deadline])
def read_deadlines(db: Session = Depends(get_db), current_user: models.UserModel = Depends(get_current_user)):
    return db.query(models.Deadline).filter(models.Deadline.owner_id == current_user.id).all()


@app.post("/deadlines", response_model=schemas.Deadline)
def create_deadline(deadline: schemas.DeadlineCreate, db: Session = Depends(get_db), current_user: models.UserModel = Depends(get_current_user)):
    new_deadline = models.Deadline(**deadline.dict(), owner_id=current_user.id)
    db.add(new_deadline)
    db.commit()
    db.refresh(new_deadline)
    return new_deadline


@app.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.UserModel).filter(
        models.UserModel.email == form_data.username).first()

    if not user:
        print(f"DEBUG: Юзер {form_data.username} не найден")
        raise HTTPException(status_code=401, detail="Invalid email")

    try:
        is_valid = auth.verify_password(
            form_data.password, user.hashed_password)
    except Exception as e:
        print(f"DEBUG: Ошибка при проверке пароля: {e}")
        raise HTTPException(
            status_code=500, detail="Password verification failed")

    if not is_valid:
        raise HTTPException(status_code=401, detail="Invalid password")

    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.UserModel).filter(
        models.UserModel.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pwd = auth.get_password_hash(user.password)
    new_user = models.UserModel(email=user.email, hashed_password=hashed_pwd)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@app.get("/deadlines/")
def get_all_deadlines(db: Session = Depends(get_db)):
    results = db.query(models.Deadline).all()
    return results


@app.post("/deadlines/test", response_model=schemas.Deadline)
def create_test_deadline(deadline: schemas.DeadlineCreate, db: Session = Depends(get_db)):
    test_user = db.query(models.UserModel).first()

    if not test_user:
        test_user = models.UserModel(
            email="test@test.com", hashed_password="123")
        db.add(test_user)
        db.commit()
        db.refresh(test_user)

    new_deadline = models.Deadline(**deadline.dict(), owner_id=test_user.id)
    db.add(new_deadline)
    db.commit()
    db.refresh(new_deadline)
    return new_deadline


@app.delete("/deadlines/{deadline_id}")
def delete_deadline(deadline_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    db_deadline = db.query(models.Deadline).filter(
        models.Deadline.id == deadline_id,
        models.Deadline.owner_id == current_user.id
    ).first()
    if not db_deadline:
        raise HTTPException(status_code=404, detail="Deadline not found")
    db.delete(db_deadline)
    db.commit()
    return {"message": "Deleted successfully"}
