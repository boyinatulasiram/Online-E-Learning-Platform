import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import Navbar from '../../components/Navbar';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    category: '',
    isPublished: true
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await api.get(`/educators/course/${id}`);
      const course = response.data;
      setFormData({
        title: course.title,
        description: course.description,
        videoUrl: course.videoUrl,
        category: course.category,
        isPublished: course.isPublished
      });
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required fields
    if (!formData.title || !formData.description || !formData.videoUrl || !formData.category) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    if (!youtubeRegex.test(formData.videoUrl)) {
      setError('Please provide a valid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      await api.put(`/educators/edit-course/${id}`, formData);
      navigate('/educator/courses');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update course');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
            <p className="mt-2 text-gray-600">Update your course information</p>
          </div>

          <div className="bg-white shadow rounded-lg">
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Course Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter course title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Describe what students will learn in this course"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">
                  YouTube Video URL *
                </label>
                <input
                  type="url"
                  name="videoUrl"
                  id="videoUrl"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.videoUrl}
                  onChange={handleChange}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Enter a valid YouTube video URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
                </p>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Programming">Programming</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Language">Language</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                  Publish course
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate('/educator/courses')}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;


