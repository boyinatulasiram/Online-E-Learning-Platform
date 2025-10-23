const express = require('express');
const Course = require('../models/Course');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// Apply authentication and role check to all routes
router.use(auth);
router.use(requireRole(['educator']));

// Get educator's courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({ educatorId: req.user._id })
      .populate('studentsEnrolled', 'name email');
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new course
router.post('/add-course', async (req, res) => {
  try {
    const { title, description, videoUrl, category } = req.body;

    // Validate required fields
    if (!title || !description || !videoUrl || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
    if (!youtubeRegex.test(videoUrl)) {
      return res.status(400).json({ message: 'Please provide a valid YouTube URL' });
    }

    const course = new Course({
      title,
      description,
      videoUrl,
      category,
      educatorId: req.user._id
    });

    await course.save();
    await course.populate('educatorId', 'name email');

    res.status(201).json({
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Edit course
router.put('/edit-course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, videoUrl, category, isPublished } = req.body;

    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if educator owns this course
    if (course.educatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Validate YouTube URL if provided
    if (videoUrl) {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/;
      if (!youtubeRegex.test(videoUrl)) {
        return res.status(400).json({ message: 'Please provide a valid YouTube URL' });
      }
    }

    // Update course
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (videoUrl) updateData.videoUrl = videoUrl;
    if (category) updateData.category = category;
    if (typeof isPublished === 'boolean') updateData.isPublished = isPublished;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true }
    ).populate('educatorId', 'name email');

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete course
router.delete('/delete-course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if educator owns this course
    if (course.educatorId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Course.findByIdAndDelete(courseId);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get specific course details
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId)
      .populate('educatorId', 'name email')
      .populate('studentsEnrolled', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if educator owns this course
    if (course.educatorId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


