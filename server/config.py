import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
DATABASE_URL = "postgresql://pectron_owner:U2PaSndB6TIo@ep-silent-glade-a5a4lkh6.us-east-2.aws.neon.tech/pectron"
