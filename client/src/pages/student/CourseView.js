import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/students/course/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      await api.post(`/students/enroll/${id}`);
      fetchCourse();
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setEnrolling(false);
    }
  };

  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
            <Link
              to="/student/courses"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(course.videoUrl);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <Link
              to="/student/courses"
              className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
            >
              ← Back to Courses
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-gray-600">By {course.educatorId.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Video Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Video</h2>
                  
                  {embedUrl ? (
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <iframe
                        src={embedUrl}
                        title={course.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-96 rounded-lg"
                      ></iframe>
                    </div>
                  ) : (
                    <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <p className="text-gray-500 mb-4">Invalid YouTube URL</p>
                        <a
                          href={course.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                        >
                          Open in YouTube
                        </a>
                      </div>
                    </div>
                  )}

                  {!course.isEnrolled && (
                    <div className="text-center">
                      <button
                        onClick={handleEnroll}
                        disabled={enrolling}
                        className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        {enrolling ? 'Enrolling...' : 'Enroll in Course'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Description</h4>
                    <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Category</h4>
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded mt-1">
                      {course.category}
                    </span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Instructor</h4>
                    <p className="text-gray-600 text-sm mt-1">{course.educatorId.name}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Students Enrolled</h4>
                    <p className="text-gray-600 text-sm mt-1">{course.studentsEnrolled?.length || 0}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900">Created</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;


