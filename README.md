# 📋 Task Manager App

A full-stack Task Manager application built with Node.js, Express, MongoDB, and Vanilla JavaScript. Users can register, login, and manage their personal tasks.

Features

- User registration & login with JWT authentication
- Each user sees only their own tasks
- Create, complete, edit & delete tasks
- Passwords hashed with bcrypt
- Protected API routes with auth middleware
- Frontend served directly from Express
- MongoDB for persistent data storage

 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Frontend | Vanilla HTML/CSS/JS |
| Dev Tool | Nodemon |

Project Structure


node_nosql/
├── app.js                  # Main server entry point
├── db.js                   # MongoDB connection
├── model/
│   ├── Task.js             # Task schema & model
│   └── User.js             # User schema & model
├── routes/
│   └── auth.js             # Register & login routes
├── middleware/
│   └── auth.js             # JWT auth middleware
├── public/
│   └── index.html          # Frontend UI
├── package.json
└── README.md


Getting Started

# Prerequisites

- Node.js v18+
- MongoDB (local or Docker or Atlas)
- npm

# Installation

1. Clone the repo
   ```bash
   git clone https://github.com/yourusername/node_nosql.git
   cd node_nosql
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start MongoDB

   Using Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   ```

   Or using MongoDB Atlas — update the connection string in `db.js`:
   ```js
   await mongoose.connect('mongodb+srv://username:password@cluster.mongodb.net/taskmanager')
   ```

4. Run the app
   ```bash
   node app.js
   ```

5. Open in browser
   ```
   http://localhost:3000
   ```

 🔌 API Endpoints

# Auth Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /auth/register | Register new user | No |
| POST | /auth/login | Login & get JWT token | No |

# Task Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /tasks | Get all tasks for logged in user | Yes |
| POST | /tasks | Create a new task | Yes |
| PUT | /tasks/:id | Toggle task complete/incomplete | Yes |
| PUT | /tasks/:id/title | Update task title | Yes |
| DELETE | /tasks/:id | Delete a task | Yes |

How Auth Works

1. User registers → password is hashed with bcrypt → saved to MongoDB
2. User logs in → password compared → JWT token issued
3. Token stored in `localStorage` on frontend
4. Every request to protected routes sends token in `Authorization: Bearer <token>` header
5. Auth middleware verifies token → extracts user ID → attaches to `req.userId`

Dependencies

```json
{
  "express": "^4.x",
  "mongoose": "^8.x",
  "jsonwebtoken": "^9.x",
  "bcryptjs": "^2.x"
}
```

Run with Docker

Start MongoDB container:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

Start the app:
```bash
node app.js
```

Deploy to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node app.js`
6. Add environment variable: `MONGO_URI` = your MongoDB Atlas connection string
7. Deploy!

Author
Dawood — Built as a Node.js learning project for beginner

 📄 License

MIT