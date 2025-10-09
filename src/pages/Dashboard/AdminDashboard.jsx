import React, { useState, useEffect } from 'react';

const COURSES_STORAGE_KEY = 'courses';

export default function AdminDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Load courses from localStorage on mount
  useEffect(() => {
    const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  // Save courses to localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
  }, [courses]);

  const handleAddCourse = () => {
    if (!title.trim() || !description.trim()) {
      setMessage('Please enter both title and description.');
      return;
    }

    // Create new course object
    const newCourse = {
      id: Date.now(), // simple unique id
      title: title.trim(),
      description: description.trim(),
    };

    setCourses([...courses, newCourse]);
    setTitle('');
    setDescription('');
    setMessage('Course added successfully!');
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Create and manage courses here.</p>

      <div style={{ marginBottom: 20 }}>
        <h3>Add New Course</h3>
        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8 }}
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', marginBottom: 10, width: '100%', padding: 8, minHeight: 80 }}
        />
        <button onClick={handleAddCourse} style={{ padding: '8px 16px' }}>
          Add Course
        </button>
        {message && <p style={{ color: 'green', marginTop: 10 }}>{message}</p>}
      </div>

      <div>
        <h3>Existing Courses</h3>
        {courses.length === 0 ? (
          <p>No courses created yet.</p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <strong>{course.title}</strong> - {course.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
