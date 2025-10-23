const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and role check to all routes
router.use(auth);
router.use(requireRole(['student']));

// Get all available courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('educatorId', 'name email')
      .select('-studentsEnrolled');
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get enrolled courses
router.get('/enrolled', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'enrolledCourses',
      populate: {
        path: 'educatorId',
        select: 'name email'
      }
    });
    
    res.json(user.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll in a course
router.post('/enroll/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const user = await User.findById(req.user._id);
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Add course to user's enrolled courses
    user.enrolledCourses.push(courseId);
    await user.save();

    // Add user to course's enrolled students
    course.studentsEnrolled.push(req.user._id);
    await course.save();

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific course details
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId)
      .populate('educatorId', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if student is enrolled
    const user = await User.findById(req.user._id);
    const isEnrolled = user.enrolledCourses.includes(courseId);
    
    res.json({
      ...course.toObject(),
      isEnrolled
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

