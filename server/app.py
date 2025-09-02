from fastapi import FastAPI, Response, HTTPException, status, Request, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from bcrypt import hashpw, gensalt, checkpw
import jwt
from datetime import datetime, timedelta
from typing import List
from bson import ObjectId
import os 

load_dotenv()

db_url = os.getenv("DB_URL")
jwt_secret = os.getenv("JWT_SECRET")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

client = AsyncIOMotorClient(db_url)
db = client["fastapi-db"]
users = db["users"]
polls = db["polls"]

class UserRegister(BaseModel):
    name: str = Field(..., min_length=4)
    email: str
    password: str = Field(..., min_length=8 )

class UserLogin(BaseModel):
    email: str 
    password: str = Field(..., min_length=8)

class NewPoll(BaseModel):
    question: str = Field(..., min_length=5)
    options: List[str] = Field(..., min_length=2)

class VoteRequest(BaseModel):
    option_id: int 

SEVEN_DAYS_IN_SECONDS = 604800

async def get_current_user(request: Request) -> dict:
    token_cookie = request.cookies.get('access_token')

    if not token_cookie:
        return { "is_verified": False, "message": "No token provided" }
    
    payload = jwt.decode(token_cookie, jwt_secret, algorithms=['HS256'])
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token payload")
    
    user = await users.find_one({"email": email})
    user['_id'] = str(user['_id'])
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
        
    return { 'is_verified': True, 'user': user }

@app.get('/')
def greet():
    return {'message': 'Hi'}

@app.get('/get_user')
def get_user(current_user: dict = Depends(get_current_user)):
    if not current_user['is_verified']:
        return
    
    return { 'name': current_user['user']['name'], 'email': current_user['user']['email'] }

@app.get('/users')
async def get_users():
    users_list = await users.find().to_list(length=None)
    for user in users_list:
        user['_id'] = str(user['_id'])        
    return users_list

@app.post('/register')
async def register_user(response: Response, new_user: UserRegister):
    user_exists = await users.find_one({ 'email': new_user.email })

    if user_exists:
        raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, 
                detail="User exists!"
            )

    hash_pwd = hashpw(new_user.password.encode("utf-8"), gensalt()).decode("utf-8")
    user_dump = new_user.model_dump()
    user_dump['password'] = hash_pwd
    res = await users.insert_one(user_dump)
    user_dump['_id'] = str(user_dump['_id'])

    if not res.acknowledged:
        raise HTTPException(
                status_code=status.HTTP_417_EXPECTATION_FAILED, 
                detail="Failed to create the user."
            )
    
    payload = {
        'sub': str(user_dump['email']),
        'exp': datetime.now() + timedelta(days=7)
    }

    token = jwt.encode(payload, jwt_secret, algorithm='HS256')
    response.set_cookie(
        key='access_token',
        value=token,
        httponly=True,
        max_age=SEVEN_DAYS_IN_SECONDS
    )

    return  { 
        "ok": True, 
        "message": "User Created Successfully!" ,
        "user": user_dump
        }

@app.post('/login')
async def validate_user(response: Response, user_data: UserLogin):
    existing_user = await users.find_one({ 'email': user_data.email })
    existing_user['_id'] = str(existing_user['_id'])

    if not existing_user:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Not a valid user"
            )

    is_correct_pw = checkpw(user_data.password.encode('utf-8'), existing_user['password'].encode('utf-8'))

    if not is_correct_pw:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="User credentials do not match"
            )
    
    payload = {
        'sub': str(existing_user['email']),
        'exp': datetime.now() + timedelta(days=7)
    }

    token = jwt.encode(payload, jwt_secret, algorithm='HS256')
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=SEVEN_DAYS_IN_SECONDS
    )

    return { 
        "ok": True, 
        "message": "User logged in successfully!",
        "user": existing_user
    }

@app.post('/logout')
async def logout_user(response: Response):
    response.delete_cookie(
        key="access_token",
    )

    return {
        "ok": True,
        "message": "Logged out successfully"
    }

@app.get('/polls')
async def get_polls(current_user: dict = Depends(get_current_user)):
    polls_list = await polls.find({ 'creator_email': current_user['user']['email']}).to_list()
    polls_list.reverse()

    for poll in polls_list:
        poll['_id'] = str(poll['_id'])

    if len(polls_list) <= 5:
        return polls_list

    return polls_list[:5]

@app.get('/polls/latest')
async def get_polls(current_user: dict = Depends(get_current_user)):
    polls_list = await polls.find({}).to_list()
    polls_list.reverse()

    for poll in polls_list:
        poll['_id'] = str(poll['_id'])

    if len(polls_list) <= 5:
        return polls_list

    return polls_list[:5]

@app.get('/polls/{poll_id}')
async def get_poll(poll_id: str, current_user: dict = Depends(get_current_user)):
    poll = await polls.find_one({ '_id': ObjectId(poll_id) })
    poll['_id'] = str(poll['_id'])
    return poll

@app.post('/polls')
async def create_poll(poll_res: NewPoll, current_user: dict = Depends(get_current_user)):
    new_poll = {
        "question": poll_res.question,
        "options": [{"id": idx,"text": opt, "votes": 0} for idx, opt in enumerate(poll_res.options)],
        "voted_users": [],
        "creator_name": current_user['user']['name'],
        "creator_email": current_user['user']['email']
    }

    res = await polls.insert_one(new_poll)

    if not res.acknowledged:
        raise HTTPException(
                status_code=status.HTTP_417_EXPECTATION_FAILED, 
                detail="Failed to create the poll."
            )
    print(new_poll)
    new_poll['_id'] = str(new_poll['_id'])
    
    return {
        "ok": True,
        "message": "Poll created successfully!",
        "new_poll": new_poll
    }

@app.put('/polls/{poll_id}/vote')
async def update_votes(poll_id: str, vote_req: VoteRequest , current_user: dict = Depends(get_current_user)):
    print(vote_req)

    voted_user = {
        'email': current_user['user']['email'],
        'option': vote_req.option_id
    }

    res = await polls.update_one(
            {'_id': ObjectId(poll_id), 'options.id': vote_req.option_id, 'voted_users.email': {'$ne': current_user['user']['email']}}, 
            {'$inc': {'options.$.votes': 1}, '$addToSet': {'voted_users': voted_user}}
        )

    updated_poll = await polls.find_one({ '_id': ObjectId(poll_id) })
    updated_poll['_id'] = str(updated_poll['_id'])

    return {
        "ok": True,
        "message": "Voting successful!",
        "updated_poll": updated_poll
    }