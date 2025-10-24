import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentCourses from './pages/student/StudentCourses';
import StudentEnrolled from './pages/student/StudentEnrolled';
import CourseView from './pages/student/CourseView';
import EducatorDashboard from './pages/educator/EducatorDashboard';
import EducatorCourses from './pages/educator/EducatorCourses';
import AddCourse from './pages/educator/AddCourse';
import EditCourse from './pages/educator/EditCourse';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Student routes */}
            <Route path="/student" element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/courses" element={
              <ProtectedRoute requiredRole="student">
                <StudentCourses />
              </ProtectedRoute>
            } />
            <Route path="/student/enrolled" element={
              <ProtectedRoute requiredRole="student">
                <StudentEnrolled />
              </ProtectedRoute>
            } />
            <Route path="/student/course/:id" element={
              <ProtectedRoute requiredRole="student">
                <CourseView />
              </ProtectedRoute>
            } />
            
            {/* Educator routes */}
            <Route path="/educator" element={
              <ProtectedRoute requiredRole="educator">
                <EducatorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/educator/courses" element={
              <ProtectedRoute requiredRole="educator">
                <EducatorCourses />
              </ProtectedRoute>
            } />
            <Route path="/educator/add-course" element={
              <ProtectedRoute requiredRole="educator">
                <AddCourse />
              </ProtectedRoute>
            } />
            <Route path="/educator/edit-course/:id" element={
              <ProtectedRoute requiredRole="educator">
                <EditCourse />
              </ProtectedRoute>
            } />
            
            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
