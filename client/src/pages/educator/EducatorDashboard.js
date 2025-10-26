import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const EducatorDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/educators/courses');
      const courses = response.data;
      
      setStats({
        totalCourses: courses.length,
        totalStudents: courses.reduce((total, course) => total + (course.studentsEnrolled?.length || 0), 0)
      });

      // Get recent courses (last 3)
      setRecentCourses(courses.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-white/70"></div>
        </div>
        <div className="relative z-10">
          <Navbar />
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop')`
        }}
      >
        {/* Soft overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/80"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg rounded-2xl p-8 text-gray-800">
              <h1 className="text-4xl font-bold mb-2 text-gray-900">Educator Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage your courses and inspire the next generation</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 hover:bg-white/50 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Courses</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.totalCourses}</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 hover:bg-white/50 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Total Students</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/educator/add-course"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create New Course
                </Link>
                <Link
                  to="/educator/courses"
                  className="block w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Manage Courses
                </Link>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Courses</h3>
              {recentCourses.length > 0 ? (
                <div className="space-y-3">
                  {recentCourses.map((course) => (
                    <div key={course._id} className="border-b border-gray-200 pb-2">
                      <Link
                        to={`/educator/courses`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {course.title}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {course.studentsEnrolled?.length || 0} students enrolled
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <p className="text-gray-500 mb-4">No courses created yet.</p>
                  <Link
                    to="/educator/add-course"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Create your first course
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;

