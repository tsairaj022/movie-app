# MERN Stack Movie Application

A full-stack movie application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring role-based access control and distributed queue processing.

## Features

- User Features:
  - View movie details from IMDb's Top 250 Movies
  - Search movies by name or description
  - Sort movies by name, rating, release date, and duration
- Admin Features:
  - Add new movie details
  - Edit or delete existing movies
- Authentication & Authorization:
  - JWT-based authentication
  - Role-based access control (User/Admin)
- Performance & Scalability:
  - Distributed queue processing with RabbitMQ
  - Optimized database queries
  - Rate limiting and security measures

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- RabbitMQ
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/movie-app
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=24h
NODE_ENV=development
```

5. Start the backend server:
```bash
cd backend
npm run dev
```

6. Start the movie worker (in a separate terminal):
```bash
cd backend
npm run worker
```

7. Start the frontend development server:
```bash
cd frontend
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Movies
- GET /api/movies - Get all movies (with pagination)
- GET /api/movies/search - Search movies
- GET /api/movies/:id - Get movie by ID
- POST /api/movies - Add new movie (admin only)
- PUT /api/movies/:id - Update movie (admin only)
- DELETE /api/movies/:id - Delete movie (admin only)

## Technologies Used

- Frontend:
  - React.js
  - Material-UI
  - Redux/Context API
  - React Router

- Backend:
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - RabbitMQ

## Deployment

The application can be deployed using various platforms:

- Frontend: Vercel, Netlify
- Backend: Heroku, AWS, Railway
- Database: MongoDB Atlas
- Message Queue: CloudAMQP

