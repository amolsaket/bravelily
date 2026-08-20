from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime, timezone
import os
import logging

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")

AWS_REGION = os.environ.get("AWS_REGION", "").strip()
S3_BUCKET = os.environ.get("S3_BUCKET_NAME", "").strip()
S3_KEY = os.environ.get("S3_OBJECT_KEY", "").strip() or "contact-submissions.txt"
LOCAL_FALLBACK = ROOT_DIR / "data" / "contact-submissions.txt"


def s3_configured() -> bool:
    # Only bucket + region are required. Credentials come from boto3's default
    # chain: static env keys if set, otherwise the IAM instance role on EC2.
    return bool(AWS_REGION and S3_BUCKET)


class ContactSubmission(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = ""
    company: Optional[str] = ""
    service: Optional[str] = "Not sure yet"
    message: str = Field(min_length=1, max_length=5000)


def format_block(sub: ContactSubmission) -> str:
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    divider = "-" * 40
    lines = [
        divider,
        f"Timestamp: {ts}",
        f"Name: {sub.name.strip()}",
        f"Email: {sub.email}",
        f"Phone: {(sub.phone or '-').strip() or '-'}",
        f"Company: {(sub.company or '-').strip() or '-'}",
        f"Service Interested: {(sub.service or 'Not sure yet').strip() or 'Not sure yet'}",
        f"Message: {sub.message.strip()}",
        divider,
    ]
    return "\n".join(lines) + "\n"


def append_to_s3(block: str) -> None:
    import boto3
    from botocore.exceptions import ClientError
    client_kwargs = {"region_name": AWS_REGION}
    access_key = os.environ.get("AWS_ACCESS_KEY_ID", "").strip()
    secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY", "").strip()
    if access_key and secret_key:
        client_kwargs["aws_access_key_id"] = access_key
        client_kwargs["aws_secret_access_key"] = secret_key
    s3 = boto3.client("s3", **client_kwargs)
    existing = ""
    try:
        existing = s3.get_object(Bucket=S3_BUCKET, Key=S3_KEY)["Body"].read().decode("utf-8")
        if existing and not existing.endswith("\n"):
            existing += "\n"
    except ClientError as e:
        if e.response.get("Error", {}).get("Code") not in ("NoSuchKey", "404"):
            raise
    s3.put_object(
        Bucket=S3_BUCKET,
        Key=S3_KEY,
        Body=(existing + block).encode("utf-8"),
        ContentType="text/plain",
    )


def append_to_local(block: str) -> None:
    LOCAL_FALLBACK.parent.mkdir(parents=True, exist_ok=True)
    with open(LOCAL_FALLBACK, "a", encoding="utf-8") as f:
        f.write(block)


@api_router.get("/")
async def root():
    return {"status": "ok", "service": "Feeding Trends API", "storage": "s3" if s3_configured() else "local-fallback"}


@api_router.post("/contact")
def submit_contact(sub: ContactSubmission):
    block = format_block(sub)
    storage = "local"
    if s3_configured():
        try:
            append_to_s3(block)
            storage = "s3"
        except Exception:
            logger.exception("S3 write failed; storing submission in local fallback file")
            append_to_local(block)
            storage = "local-fallback"
    else:
        logger.warning("S3 bucket/region not configured; storing submission in local fallback file")
        append_to_local(block)
    return {"ok": True, "message": "Got it — I'll get back to you within 1–2 days!", "storage": storage}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
