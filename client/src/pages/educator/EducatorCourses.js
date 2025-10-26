import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const EducatorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});

  const getCourseImage = (category) => {
    const images = {
      'Programming': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'Web Development': 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
      'Data Science': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      'Machine Learning': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
      'Mobile Development': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
      'DevOps': 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop',
      'Cybersecurity': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      'Cloud Computing': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
      'Database': 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
      'AI': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
    };
    return images[category] || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop';
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/educators/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    setDeleting({ ...deleting, [courseId]: true });
    try {
      await api.delete(`/educators/delete-course/${courseId}`);
      // Remove course from local state
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    } finally {
      setDeleting({ ...deleting, [courseId]: false });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">My Courses</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Manage your courses and inspire students worldwide</p>
          </div>
          <Link
            to="/educator/add-course"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add New Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-xl mb-6">You haven't created any courses yet.</div>
            <Link
              to="/educator/add-course"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Course Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={getCourseImage(course.category)} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      course.isPublished 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-white/90 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                      </svg>
                      {course.studentsEnrolled?.length || 0} students
                    </div>
                    <div className="text-right">
                      <div className="text-xs">Created</div>
                      <div className="font-medium">{new Date(course.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link
                      to={`/educator/edit-course/${course._id}`}
                      className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Edit Course
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      disabled={deleting[course._id]}
                      className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 font-medium"
                    >
                      {deleting[course._id] ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorCourses;


