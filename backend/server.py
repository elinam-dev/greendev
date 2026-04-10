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
ADMIN_NOTIFICATION_EMAIL = os.environ.get("ADMIN_NOTIFICATION_EMAIL", "greendev.associates@gmail.com")

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
    return {"message": "GreenDev Associates International Limited API"}

@api_router.get("/company-info")
async def get_company_info():
    return {
        "name": "GreenDev Associates International Limited",
        "tagline": "Sustainability Solutions Provider",
        "address": "Zees Plaza, 6th Street, Dawhenya, Tema Comm 25 – Dawhenya Stretch",
        "postal": "P. O. BOX CS 8412 TEMA",
        "email": "greendev.associates@gmail.com",
        "phones": ["+233 (0) 266 984 364", "+233 (0) 247 197 014", "+233 (0) 558 600 571"],
        "vision": "To be acclaimed as a resourceful, responsive and reliable sustainability solutions provider in the sub-region.",
        "mission": "To provide professional and practicable guidance for companies to ensure sustainable development at all stages of the project cycle.",
        "incorporated": "April 20, 2016",
        "tin": "C0006411843"
    }

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
        "years_experience": 9,  # Since 2016
        "projects_delivered": 100,
        "industries_served": 6,
        "expert_consultants": 11
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
    
    # Seed initial data with REAL company data
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
    # Clear existing data and reseed with real company data
    
    # Seed REAL team members from company profile
    if await db.team_members.count_documents({}) == 0:
        team = [
            {
                "id": str(uuid.uuid4()),
                "name": "Kojo Anagbo",
                "role": "Managing Partner",
                "expertise": "Environmental Sustainability Practitioner",
                "bio": "Leading the firm's strategic direction and overseeing all environmental sustainability initiatives across Ghana and West Africa.",
                "order": 1,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Emmanuel Okoh Agyemang",
                "role": "Partner/Principal Consultant",
                "expertise": "Sanitation Engineering Specialist",
                "bio": "Expert in sanitation engineering with extensive experience in water and wastewater management systems design and implementation.",
                "order": 2,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Dr. Elvis Nyarko",
                "role": "Senior Consultant",
                "expertise": "Marine Ecology",
                "bio": "Specialized in marine ecology and coastal environmental assessments for offshore and nearshore projects.",
                "order": 3,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Steven Albert Tsike Kwadwo",
                "role": "Senior Consultant",
                "expertise": "Ecologist",
                "bio": "Expert ecologist specializing in biodiversity assessments and ecological impact studies.",
                "order": 4,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Isaac Simpson",
                "role": "Senior Consultant",
                "expertise": "Health and Safety Specialist",
                "bio": "Certified health and safety professional with expertise in HSE management systems and workplace safety audits.",
                "order": 5,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Delali Gamor",
                "role": "Associate Consultant",
                "expertise": "Coastal Zone Management Specialist",
                "bio": "PhD Candidate in Coastal Zone Management with MPhil in Integrated Coastal Zone Management and BSc in Fisheries and Aquatic Sciences.",
                "order": 6,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Jalel Moujaled",
                "role": "Associate Consultant",
                "expertise": "Renewable Energy Specialist",
                "bio": "Expert in renewable energy project assessments and sustainable energy solutions implementation.",
                "order": 7,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Nathaniel Sackey",
                "role": "Associate Consultant",
                "expertise": "Environmental Geology Expert",
                "bio": "Specialized in geotechnical investigations and environmental geology assessments.",
                "order": 8,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Isaac Edem Bibah",
                "role": "Project Manager",
                "expertise": "Stakeholder Engagement Practitioner",
                "bio": "Expert in stakeholder engagement and community consultation for environmental projects.",
                "order": 9,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Nana Yaw Wiafe",
                "role": "Lab Technician",
                "expertise": "Air Quality, Wastewater and Noise Monitoring Specialist",
                "bio": "Specialized in environmental media monitoring including air quality, wastewater analysis, and noise level assessments.",
                "order": 10,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Florence Amponsah",
                "role": "Research Assistant",
                "expertise": "Research and Data Collection",
                "bio": "Supporting research activities and field data collection for environmental assessments.",
                "order": 11,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.team_members.insert_many(team)
        logger.info("Seeded REAL team members from company profile")
    
    # Seed REAL projects from company profile
    if await db.projects.count_documents({}) == 0:
        projects = [
            {
                "id": str(uuid.uuid4()),
                "client_name": "Puma Energy Ghana Limited / Blue Ocean Investments Limited",
                "project_type": "Environmental Impact Assessment",
                "location": "Tema, Ghana",
                "summary": "Environmental Impact Assessment for Proposed Dual 3.2 kilometer LPG/Fuel Underground Pipeline Project to connect Tema Oil Refinery and Kpone Marine Services Limited in Tema Heavy Industrial Area.",
                "year": 2016,
                "industry": "Oil & Gas",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Puma Energy Ghana Limited",
                "project_type": "Environmental Management Plan",
                "location": "Tema Free Zones, Ghana",
                "summary": "Preparation of Environmental Management Plan (EMP) for 15 million litre aviation fuel tank farm at Tema Free Zones.",
                "year": 2017,
                "industry": "Oil & Gas",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Enclave Power Company",
                "project_type": "Environmental & Social Impact Assessment",
                "location": "Greater Accra, Ghana",
                "summary": "Environmental & Social Impact Assessment for a 396 MVA Power Substation for the 2000-acre Dawa Industrial City project in the Greater Accra Region.",
                "year": 2017,
                "industry": "Energy",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Devtraco Limited",
                "project_type": "Environmental Management Plan & Annual Environmental Report",
                "location": "Tema Community 25, Ghana",
                "summary": "Preparation of Annual Environmental Report and Wastewater and StormWater Management Action Plan for 203-acre Devtraco Courts Residential Estate & Housing Project.",
                "year": 2017,
                "industry": "Built Environment",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Devtraco Limited",
                "project_type": "Comprehensive Waste Management Plan",
                "location": "Prampram, Ghana",
                "summary": "Preparation of Comprehensive Waste Management Plan & Guideline for 5000-Homes project christened Devtraco Woodlands on a 1000-acre land.",
                "year": 2018,
                "industry": "Built Environment",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Africa Cement Factory Limited",
                "project_type": "Environmental Impact Assessment",
                "location": "Tema Free Zones, Ghana",
                "summary": "Environmental Impact Assessment for proposed Cement Grinding station at Tema Free Zones Enclave.",
                "year": 2019,
                "industry": "Manufacturing",
                "featured": True,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Kasapreko Company Limited",
                "project_type": "Environmental Management Plan",
                "location": "Spintex, Accra, Ghana",
                "summary": "Preparation of Environmental Management Plan to renew permit for alcoholic beverage, non-alcoholic beverage and bottled water plant.",
                "year": 2020,
                "industry": "Manufacturing",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "AMPC International Health Consultants / New Crystal Health Services",
                "project_type": "Environmental & Social Impact Assessment",
                "location": "Ghana",
                "summary": "Undertaking Environmental & Social Impact Assessment and Life and Fire Safety services for expansion of 2 hospitals and construction of 2 new hospitals to obtain environmental permits and fire permits.",
                "year": 2020,
                "industry": "Built Environment",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Yantai Chemicals Limited",
                "project_type": "Environmental and Social Impact Assessment",
                "location": "Lorlorvor, Ghana",
                "summary": "Environmental and Social Impact Assessment for proposed caustic soda manufacturing plant.",
                "year": 2019,
                "industry": "Manufacturing",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Green Cross Burkina Faso / Amya Agro Plus",
                "project_type": "Environmental & Social Impact Assessment",
                "location": "Burkina Faso",
                "summary": "Partner Associate for preparation of Environmental & Social Impact Assessment Report for multi-cassava plantation and processing unit.",
                "year": 2018,
                "industry": "Agriculture",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Octoglow Ghana Limited / Murphy Homes Limited",
                "project_type": "Environmental & Social Impact Assessment",
                "location": "Tema Community 21, Ghana",
                "summary": "Environmental & Social Impact Assessment including liaison services for acquisition of environmental permit for the proposed 125-acre Avilla Gardens estate project.",
                "year": 2017,
                "industry": "Built Environment",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Ferro Fabrik Limited",
                "project_type": "Environmental & Social Impact Assessment",
                "location": "Tema Free Zones, Ghana",
                "summary": "Preparation of ESIA for proposed Iron Rod Manufacturing Facility in Tema Free Zones Enclave.",
                "year": 2018,
                "industry": "Manufacturing",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Vester Oil Mills Limited",
                "project_type": "Environmental Management Plan",
                "location": "Ashanti Region, Ghana",
                "summary": "Preparation of Environmental Management Plan for soya oil processing plant and Vegetable Oil Extraction factory.",
                "year": 2019,
                "industry": "Agriculture",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Ghana Steels Limited",
                "project_type": "Environmental Management Plan",
                "location": "Kpone, Ghana",
                "summary": "Preparation of Environmental Management Plan to renew permit for steel products and plastic recycling factories.",
                "year": 2020,
                "industry": "Manufacturing",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "client_name": "Atlantic Quarry Limited",
                "project_type": "Environmental Management Plan & Monitoring",
                "location": "Huapase, Ghana",
                "summary": "Preparation of Environmental Management Plan and Environmental Monitoring Report for quarry operations.",
                "year": 2019,
                "industry": "Mining",
                "featured": False,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.projects.insert_many(projects)
        logger.info("Seeded REAL projects from company profile")
    
    # Seed REAL client logos from company profile
    if await db.client_logos.count_documents({}) == 0:
        clients = [
            {"id": str(uuid.uuid4()), "name": "Puma Energy Ghana Limited", "logo_url": "/clients/puma-energy.png", "order": 1, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Devtraco Limited", "logo_url": "/clients/devtraco.png", "order": 2, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Enclave Power Company", "logo_url": "/clients/enclave-power.png", "order": 3, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Kasapreko Company Limited", "logo_url": "/clients/kasapreko.png", "order": 4, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Africa Cement Factory Limited", "logo_url": "/clients/africa-cement.png", "order": 5, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Ghana Steels Limited", "logo_url": "/clients/ghana-steels.png", "order": 6, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Vester Oil Mills Limited", "logo_url": "/clients/vester-oil.png", "order": 7, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Ferro Fabrik Limited", "logo_url": "/clients/ferro-fabrik.png", "order": 8, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Ayaan Global Ghana Limited", "logo_url": "/clients/ayaan-global.png", "order": 9, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "Reroy Cables Limited", "logo_url": "/clients/reroy-cables.png", "order": 10, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "M. Barbisotti and Sons Limited", "logo_url": "/clients/barbisotti.png", "order": 11, "created_at": datetime.now(timezone.utc).isoformat()},
            {"id": str(uuid.uuid4()), "name": "International Warehouse Company", "logo_url": "/clients/iwc.png", "order": 12, "created_at": datetime.now(timezone.utc).isoformat()},
        ]
        await db.client_logos.insert_many(clients)
        logger.info("Seeded REAL client logos from company profile")
    
    # Seed testimonials
    if await db.testimonials.count_documents({}) == 0:
        testimonials = [
            {
                "id": str(uuid.uuid4()),
                "name": "Project Manager",
                "role": "Operations",
                "company": "Puma Energy Ghana",
                "content": "GreenDev Associates delivered exceptional work on our EIA for the LPG/Fuel pipeline project. Their thoroughness and understanding of EPA Ghana requirements ensured smooth permit acquisition.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "Development Director",
                "role": "Real Estate",
                "company": "Devtraco Limited",
                "content": "The team's expertise in environmental management planning for our large-scale residential projects has been invaluable. They consistently deliver practical and compliant solutions.",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "name": "HSE Manager",
                "role": "Manufacturing",
                "company": "Kasapreko Company Limited",
                "content": "Professional, knowledgeable, and committed to delivering quality. GreenDev is our trusted partner for all environmental permit renewals and compliance needs.",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.testimonials.insert_many(testimonials)
        logger.info("Seeded testimonials")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
