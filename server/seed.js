const mongoose = require('mongoose');
const User = require('./models/User');
const Course = require('./models/Course');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/learning-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    // Create sample educator
    const educator = new User({
      name: 'Dr. Sarah Johnson',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'educator'
    });
    await educator.save();

    // Create sample student
    const student = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'student'
    });
    await student.save();

    // Create sample courses
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB to become a full-stack developer.',
        videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
        category: 'Web Development',
        educatorId: educator._id,
        studentsEnrolled: [student._id],
        isPublished: true
      },
      {
        title: 'Python Programming for Beginners',
        description: 'Master Python programming from basics to advanced concepts with hands-on projects.',
        videoUrl: 'https://www.youtube.com/watch?v=kqtD5dpn9C8',
        category: 'Programming',
        educatorId: educator._id,
        studentsEnrolled: [],
        isPublished: true
      },
      {
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning using Python and popular libraries.',
        videoUrl: 'https://www.youtube.com/watch?v=ua-CiDNNj30',
        category: 'Data Science',
        educatorId: educator._id,
        studentsEnrolled: [],
        isPublished: true
      },
      {
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design with practical projects.',
        videoUrl: 'https://www.youtube.com/watch?v=68w2Vcot_Dc',
        category: 'Design',
        educatorId: educator._id,
        studentsEnrolled: [],
        isPublished: true
      },
      {
        title: 'Digital Marketing Masterclass',
        description: 'Comprehensive guide to digital marketing including SEO, social media, and email marketing.',
        videoUrl: 'https://www.youtube.com/watch?v=7kVeCqQCxlk',
        category: 'Marketing',
        educatorId: educator._id,
        studentsEnrolled: [],
        isPublished: true
      }
    ];

    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
    }

    // Update student's enrolled courses
    student.enrolledCourses = [courses[0]._id];
    await student.save();

    console.log('✅ Sample data created successfully!');
    console.log('📧 Educator Login: sarah@example.com / password123');
    console.log('📧 Student Login: john@example.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();


