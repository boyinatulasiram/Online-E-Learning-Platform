import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const StudentDashboard = () => {
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    availableCourses: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [enrolledResponse, coursesResponse] = await Promise.all([
        api.get('/students/enrolled'),
        api.get('/students/courses')
      ]);

      setStats({
        enrolledCourses: enrolledResponse.data.length,
        availableCourses: coursesResponse.data.length
      });

      // Get recent courses (last 3)
      setRecentCourses(coursesResponse.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Background for loading state */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://media.istockphoto.com/id/2208695141/photo/group-of-young-adults-collaborating-on-laptops-in-a-cozy-environment.webp?a=1&b=1&s=612x612&w=0&k=20&c=-6IsM-KbwtZI7b6uqkYRehG7Mfx9nhfDeWv2Ne_c5dE=')`
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
          backgroundImage: `url('https://media.istockphoto.com/id/2208695141/photo/group-of-young-adults-collaborating-on-laptops-in-a-cozy-environment.webp?a=1&b=1&s=612x612&w=0&k=20&c=-6IsM-KbwtZI7b6uqkYRehG7Mfx9nhfDeWv2Ne_c5dE=')`
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
              <h1 className="text-4xl font-bold mb-2 text-gray-900">Welcome Back!</h1>
              <p className="text-gray-600 text-lg">Continue your learning journey and explore new courses</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 hover:bg-white/50 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Enrolled Courses</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.enrolledCourses}</p>
              </div>
            </div>

            <div className="bg-white/40 backdrop-blur-sm border border-white/30 shadow-lg rounded-lg p-6 hover:bg-white/50 transition-all duration-300">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600 mb-2">Available Courses</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.availableCourses}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg rounded-xl p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/student/courses"
                  className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Browse All Courses
                </Link>
                <Link
                  to="/student/enrolled"
                  className="block w-full bg-gray-600 text-white text-center py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  View My Courses
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
                        to={`/student/course/${course._id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {course.title}
                      </Link>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No courses available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

