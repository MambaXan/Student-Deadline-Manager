import urllib.parse
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. Твой пароль
raw_password = "bxwfmGB$i26QawM"
safe_password = urllib.parse.quote_plus(raw_password)

# 2. Данные из твоего скриншота
# НОВЫЙ ЛОГИН (с точкой и ID проекта)
user = "postgres.iwbwiinrxrwhdeezlrwc"
# НОВЫЙ ХОСТ
host = "aws-1-eu-west-1.pooler.supabase.com"
# ПОРТ ИЗМЕНИЛСЯ НА 6543
port = "6543"

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{safe_password}@{host}:{port}/postgres"

# 3. Создаем движок
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()