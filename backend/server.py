from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import asyncio
import resend

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Config
JWT_SECRET = os.environ.get("JWT_SECRET", "greendev-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"

# Resend Config
resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_NOTIFICATION_EMAIL = os.environ.get("ADMIN_NOTIFICATION_EMAIL", "admin@greendevassociates.net")

# Create the main app
app = FastAPI(title="GreenDev Associates API")

# Create routers
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/api/auth")
admin_router = APIRouter(prefix="/api/admin")

# ======================== MODELS ========================

class UserBase(BaseModel):
    email: EmailStr
    name: str
    role: str = "admin"

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    project_type: str
    location: str
    summary: str
    year: int
    industry: str
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProjectCreate(BaseModel):
    client_name: str
    project_type: str
    location: str
    summary: str
    year: int
    industry: str
    image_url: Optional[str] = None
    featured: bool = False

class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    expertise: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TeamMemberCreate(BaseModel):
    name: str
    role: str
    expertise: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    order: int = 0

class ClientLogo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    logo_url: str
    order: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ClientLogoCreate(BaseModel):
    name: str
    logo_url: str
    order: int = 0

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    content: str
    image_url: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    role: str
    company: str
    content: str
    image_url: Optional[str] = None

# ======================== AUTH HELPERS ========================

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ======================== EMAIL HELPER ========================

async def send_contact_notification(submission: ContactSubmission):
    if not resend.api_key:
        logger.warning("Resend API key not configured, skipping email notification")
        return
    
    html_content = f"""
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> {submission.name}</p>
    <p><strong>Email:</strong> {submission.email}</p>
    <p><strong>Phone:</strong> {submission.phone or 'N/A'}</p>
    <p><strong>Company:</strong> {submission.company or 'N/A'}</p>
    <p><strong>Service Interest:</strong> {submission.service or 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>{submission.message}</p>
    <hr>
    <p><small>Submitted on {submission.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}</small></p>
    """
    
    params = {
        "from": SENDER_EMAIL,
        "to": [ADMIN_NOTIFICATION_EMAIL],
        "subject": f"New Contact Form Submission from {submission.name}",
        "html": html_content
    }
    
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Contact notification sent for {submission.email}")
    except Exception as e:
        logger.error(f"Failed to send contact notification: {str(e)}")

# ======================== AUTH ROUTES ========================

@auth_router.post("/login")
async def login(credentials: UserLogin, response: Response):
    email = credentials.email.lower()
    user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    access_token = create_access_token(user["id"], user["email"])
    refresh_token = create_refresh_token(user["id"])
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    
    user_response = {k: v for k, v in user.items() if k != "password_hash"}
    return {"user": user_response, "access_token": access_token}

@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@auth_router.get("/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

# ======================== PUBLIC API ROUTES ========================

@api_router.get("/")
async def root():
    return {"message": "GreenDev Associates API"}

@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(submission: ContactSubmissionCreate):
    contact = ContactSubmission(**submission.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_submissions.insert_one(doc)
    
    # Send email notification asynchronously
    asyncio.create_task(send_contact_notification(contact))
    
    return contact

@api_router.get("/projects", response_model=List[Project])
async def get_projects(featured: Optional[bool] = None, industry: Optional[str] = None):
    query = {}
    if featured is not None:
        query["featured"] = featured
    if industry:
        query["industry"] = industry
    
    projects = await db.projects.find(query, {"_id": 0}).sort("year", -1).to_list(100)
    for p in projects:
        if isinstance(p.get('created_at'), str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    return projects

@api_router.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    if isinstance(project.get('created_at'), str):
        project['created_at'] = datetime.fromisoformat(project['created_at'])
    return project

@api_router.get("/team", response_model=List[TeamMember])
async def get_team():
    members = await db.team_members.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    for m in members:
        if isinstance(m.get('created_at'), str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return members

@api_router.get("/clients", response_model=List[ClientLogo])
async def get_clients():
    clients = await db.client_logos.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    for c in clients:
        if isinstance(c.get('created_at'), str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return clients

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    for t in testimonials:
        if isinstance(t.get('created_at'), str):
            t['created_at'] = datetime.fromisoformat(t['created_at'])
    return testimonials

@api_router.get("/stats")
async def get_stats():
    return {
        "years_experience": 15,
        "projects_delivered": 500,
        "industries_served": 6,
        "expert_consultants": 50
    }

# ======================== ADMIN ROUTES ========================

@admin_router.get("/contact-submissions")
async def get_contact_submissions(request: Request):
    await get_current_user(request)
    submissions = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return submissions

@admin_router.patch("/contact-submissions/{submission_id}")
async def update_contact_status(submission_id: str, request: Request):
    await get_current_user(request)
    body = await request.json()
    status = body.get("status", "reviewed")
    result = await db.contact_submissions.update_one(
        {"id": submission_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"message": "Status updated"}

@admin_router.post("/projects", response_model=Project)
async def create_project(project: ProjectCreate, request: Request):
    await get_current_user(request)
    new_project = Project(**project.model_dump())
    doc = new_project.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.projects.insert_one(doc)
    return new_project

@admin_router.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: str, project: ProjectCreate, request: Request):
    await get_current_user(request)
    doc = project.model_dump()
    result = await db.projects.update_one({"id": project_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    updated = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@admin_router.delete("/projects/{project_id}")
async def delete_project(project_id: str, request: Request):
    await get_current_user(request)
    result = await db.projects.delete_one({"id": project_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted"}

@admin_router.post("/team", response_model=TeamMember)
async def create_team_member(member: TeamMemberCreate, request: Request):
    await get_current_user(request)
    new_member = TeamMember(**member.model_dump())
    doc = new_member.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.team_members.insert_one(doc)
    return new_member

@admin_router.put("/team/{member_id}", response_model=TeamMember)
async def update_team_member(member_id: str, member: TeamMemberCreate, request: Request):
    await get_current_user(request)
    doc = member.model_dump()
    result = await db.team_members.update_one({"id": member_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Team member not found")
    updated = await db.team_members.find_one({"id": member_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@admin_router.delete("/team/{member_id}")
async def delete_team_member(member_id: str, request: Request):
    await get_current_user(request)
    result = await db.team_members.delete_one({"id": member_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Team member not found")
    return {"message": "Team member deleted"}

@admin_router.post("/clients", response_model=ClientLogo)
async def create_client(client: ClientLogoCreate, request: Request):
    await get_current_user(request)
    new_client = ClientLogo(**client.model_dump())
    doc = new_client.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.client_logos.insert_one(doc)
    return new_client

@admin_router.put("/clients/{client_id}", response_model=ClientLogo)
async def update_client(client_id: str, client: ClientLogoCreate, request: Request):
    await get_current_user(request)
    doc = client.model_dump()
    result = await db.client_logos.update_one({"id": client_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
    updated = await db.client_logos.find_one({"id": client_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@admin_router.delete("/clients/{client_id}")
async def delete_client(client_id: str, request: Request):
    await get_current_user(request)
    result = await db.client_logos.delete_one({"id": client_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Client not found")
    return {"message": "Client deleted"}

@admin_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(testimonial: TestimonialCreate, request: Request):
    await get_current_user(request)
    new_testimonial = Testimonial(**testimonial.model_dump())
    doc = new_testimonial.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.testimonials.insert_one(doc)
    return new_testimonial

@admin_router.put("/testimonials/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, testimonial: TestimonialCreate, request: Request):
    await get_current_user(request)
    doc = testimonial.model_dump()
    result = await db.testimonials.update_one({"id": testimonial_id}, {"$set": doc})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    updated = await db.testimonials.find_one({"id": testimonial_id}, {"_id": 0})
    if isinstance(updated.get('created_at'), str):
        updated['created_at'] = datetime.fromisoformat(updated['created_at'])
    return updated

@admin_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, request: Request):
    await get_current_user(request)
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted"}

# Include routers
app.include_router(api_router)
app.include_router(auth_router)
app.include_router(admin_router)

# CORS Configuration
frontend_url = os.environ.get("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[frontend_url, "http://localhost:3000", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======================== STARTUP EVENTS ========================

@app.on_event("startup")
async def startup_event():
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.projects.create_index("id", unique=True)
    await db.team_members.create_index("id", unique=True)
    await db.client_logos.create_index("id", unique=True)
    await db.testimonials.create_index("id", unique=True)
    await db.contact_submissions.create_index("id", unique=True)
    
    # Seed admin user
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@greendevassociates.net")
    admin_password = os.environ.get("ADMIN_PASSWORD", "GreenDev2024!")
    
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        admin_id = str(uuid.uuid4())
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "id": admin_id,
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        logger.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing.get("password_hash", "")):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info(f"Admin password updated: {admin_email}")
    
    # Seed initial data
    await seed_initial_data()
    
    # Write test credentials
    Path("/app/memory").mkdir(parents=True, exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"# Test Credentials\n\n")
        f.write(f"## Admin Account\n")
        f.write(f"- Email: {admin_email}\n")
        f.write(f"- Password: {admin_password}\n")
        f.write(f"- Role: admin\n\n")
        f.write(f"## Auth Endpoints\n")
        f.write(f"- POST /api/auth/login\n")
        f.write(f"- POST /api/auth/logout\n")
        f.write(f"- GET /api/auth/me\n")

async def seed_initial_data():
    # Seed projects if empty
    if await db.projects.count_documents({}) == 0:
        projects = [
            {
                "id": str(uuid.uuid4()),
                "client_name": "Puma Energy Ghana",
                "project_type": "Environmental Impact Assessment",
                "location": "Tema, Ghana",
                "summary": "Comprehensive EIA for fuel storage facility expansion, ensuring compliance with EPA Ghana regulations.",
                "year": 2023,
                "industry": "Oil & Gas",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Devtraco Limited",
                "project_type": "Environmental Management Plan",
                "location": "Accra, Ghana",
                "summary": "Development of comprehensive EMP for mixed-use real estate development project.",
                "year": 2023,
                "industry": "Infrastructure Development",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Kasapreko Company Limited",
                "project_type": "Environmental Audit",
                "location": "Accra, Ghana",
                "summary": "Annual environmental compliance audit for beverage manufacturing facility.",
                "year": 2022,
                "industry": "Manufacturing",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Enclave Power Limited",
                "project_type": "Environmental Permit Acquisition",
                "location": "Tema, Ghana",
                "summary": "Facilitation of environmental permits for power generation facility.",
                "year": 2022,
                "industry": "Energy",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Africa Cement Factory",
                "project_type": "Social Impact Assessment",
                "location": "Aflao, Ghana",
                "summary": "Comprehensive SIA including stakeholder engagement and community development planning.",
                "year": 2021,
                "industry": "Manufacturing",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.projects.insert_many(projects)
        logger.info("Seeded initial projects")
    
    # Seed team members if empty
    if await db.team_members.count_documents({}) == 0:
        team = [
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Kwame Mensah",
                "role": "Managing Director",
                "expertise": "Environmental Science, Project Management",
                "bio": "Over 20 years of experience in environmental consulting across West Africa.",
                "image_url": "https://images.pexels.com/photos/36363694/pexels-photo-36363694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "order": 1,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Ama Owusu-Ansah",
                "role": "Principal Consultant",
                "expertise": "EIA, Social Impact Assessment",
                "bio": "Expert in environmental impact assessment with specialization in mining sector.",
                "image_url": "https://images.pexels.com/photos/4687549/pexels-photo-4687549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
                "order": 2,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Kofi Asante",
                "role": "Senior Engineer",
                "expertise": "Water & Sanitation, Geotechnical Studies",
                "bio": "Civil engineer with expertise in water resources and infrastructure development.",
                "order": 3,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Efua Boateng",
                "role": "Environmental Specialist",
                "expertise": "Environmental Audits, Permitting",
                "bio": "Specialized in regulatory compliance and environmental permitting processes.",
                "order": 4,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.team_members.insert_many(team)
        logger.info("Seeded initial team members")
    
    # Seed client logos if empty
    if await db.client_logos.count_documents({}) == 0:
        clients = [
            {"id": str(uuid.uuid4()), "name": "Puma Energy", "logo_url": "/clients/puma-energy.png", "order": 1, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Devtraco", "logo_url": "/clients/devtraco.png", "order": 2, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Kasapreko", "logo_url": "/clients/kasapreko.png", "order": 3, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Enclave Power", "logo_url": "/clients/enclave-power.png", "order": 4, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Africa Cement", "logo_url": "/clients/africa-cement.png", "order": 5, "created_at": datetime.now(timezone.utc).isoformat()},
        ]
        await db.client_logos.insert_many(clients)
        logger.info("Seeded initial client logos")
    
    # Seed testimonials if empty
    if await db.testimonials.count_documents({}) == 0:
        testimonials = [
            {
                "id": str(uuid.uuid4()),
                "name": "John Agyekum",
                "role": "Operations Manager",
                "company": "Puma Energy Ghana",
                "content": "GreenDev Associates delivered exceptional work on our EIA project. Their thoroughness and professionalism exceeded our expectations.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Sarah Mensah",
                "role": "Project Director",
                "company": "Devtraco Limited",
                "content": "The team's expertise in environmental management planning helped us achieve full regulatory compliance ahead of schedule.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Michael Osei",
                "role": "HSE Manager",
                "company": "Kasapreko Company",
                "content": "Professional, knowledgeable, and committed to delivering quality. GreenDev is our trusted partner for all environmental consulting needs.",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.testimonials.insert_many(testimonials)
        logger.info("Seeded initial testimonials")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
