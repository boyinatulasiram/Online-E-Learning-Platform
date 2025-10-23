# Learning Platform - MERN Stack Application

A full-stack online learning platform built with MongoDB, Express.js, React.js, and Node.js. This application supports two user roles: Students and Educators.

## 🚀 Features

### Student Features
- User registration and login
- Browse available courses
- Enroll in courses
- View enrolled courses
- Watch course videos (YouTube integration)
- Student dashboard with statistics

### Educator Features
- User registration and login
- Create, edit, and delete courses
- Manage course content (YouTube videos)
- Track student enrollment
- Educator dashboard with analytics

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- Tailwind CSS for styling

## 📁 Project Structure

```
FSD/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   │   ├── student/    # Student pages
│   │   │   └── educator/   # Educator pages
│   │   └── App.js
│   └── package.json
├── server/                 # Express backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── controllers/        # Route controllers
│   ├── middleware/        # Custom middleware
│   └── index.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FSD
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up Environment Variables**
   
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/learning-platform
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

5. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the connection string in your `.env` file.

6. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on http://localhost:5000

7. **Start the Frontend Development Server**
   ```bash
   cd client
   npm start
   ```
   The React app will start on http://localhost:3000

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Student Routes
- `GET /api/students/courses` - Get all available courses
- `GET /api/students/enrolled` - Get enrolled courses
- `POST /api/students/enroll/:courseId` - Enroll in course
- `GET /api/students/course/:courseId` - Get specific course

### Educator Routes
- `GET /api/educators/courses` - Get educator's courses
- `POST /api/educators/add-course` - Create new course
- `PUT /api/educators/edit-course/:id` - Update course
- `DELETE /api/educators/delete-course/:id` - Delete course
- `GET /api/educators/course/:id` - Get specific course

## 🎯 Usage

### For Students:
1. Register/Login as a Student
2. Browse available courses
3. Enroll in courses
4. Watch course videos
5. Track progress in dashboard

### For Educators:
1. Register/Login as an Educator
2. Create courses with YouTube video links
3. Manage course content
4. Track student enrollment
5. Monitor course performance

## 🔧 Configuration

### Database Models

**User Model:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/educator),
  enrolledCourses: [ObjectId]
}
```

**Course Model:**
```javascript
{
  title: String,
  description: String,
  videoUrl: String (YouTube URL),
  category: String,
  educatorId: ObjectId,
  studentsEnrolled: [ObjectId],
  isPublished: Boolean
}
```

## 🎨 Frontend Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Student Routes
- `/student` - Student dashboard
- `/student/courses` - Browse courses
- `/student/enrolled` - Enrolled courses
- `/student/course/:id` - Course view

### Educator Routes
- `/educator` - Educator dashboard
- `/educator/courses` - Manage courses
- `/educator/add-course` - Create course
- `/educator/edit-course/:id` - Edit course

## 🔐 Authentication

- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes for students and educators
- Secure password hashing with bcryptjs

## 🎥 Video Integration

- YouTube video embedding
- Support for YouTube URLs (youtube.com/watch?v= and youtu.be/)
- Responsive video players
- Direct YouTube link fallback

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use a cloud MongoDB service
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Update environment variables for production

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy to platforms like Netlify, Vercel, or AWS S3
3. Update API endpoints to point to production backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy Learning! 🎓**

