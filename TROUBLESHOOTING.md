# Troubleshooting Guide

## Common Issues and Solutions

### 1. Server Won't Start
- **Issue**: MongoDB connection error
- **Solution**: Make sure MongoDB is running locally or update the connection string in `.env`
- **Check**: Visit `http://localhost:5000/api/health` to verify server status

### 2. Frontend Build Errors
- **Issue**: Tailwind CSS not working
- **Solution**: Run `npm install` in the client directory to install missing dependencies
- **Files Fixed**: Added `tailwind.config.js` and `postcss.config.js`

### 3. CORS Errors
- **Issue**: Frontend can't connect to backend
- **Solution**: CORS configuration has been updated in `server/index.js`
- **Check**: Ensure both servers are running on correct ports

### 4. Authentication Issues
- **Issue**: JWT token errors
- **Solution**: Check that JWT_SECRET is set in `.env` file
- **Default**: Uses fallback secret for development

### 5. Database Connection
- **Issue**: MongoDB connection fails
- **Solution**: 
  - Install MongoDB locally, or
  - Use MongoDB Atlas and update connection string
  - Default: `mongodb://localhost:27017/learning-platform`

## Quick Start Commands

### Using the batch script:
```bash
# Run this from the project root
start-dev.bat
```

### Manual start:
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend  
cd client
npm install
npm start
```

## Port Configuration
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- MongoDB: mongodb://localhost:27017

## Environment Variables
Create `server/.env` with:
```
MONGODB_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## Dependencies Fixed
- Updated Express to stable version (4.18.2)
- Added PostCSS and Autoprefixer for Tailwind
- Fixed bcryptjs version compatibility
- Added proper CORS configuration

## Testing the Fix
1. Run `start-dev.bat` or start servers manually
2. Visit http://localhost:3000
3. Try registering a new user
4. Check browser console for any remaining errors