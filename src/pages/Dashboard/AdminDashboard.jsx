import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';  // Import CSS file

const COURSES_STORAGE_KEY = 'courses';

export default function AdminDashboard({ user }) {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COURSES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCourses(parsed);
        } else {
          console.warn('Invalid courses data. Resetting...');
          localStorage.removeItem(COURSES_STORAGE_KEY);
        }
      }
    } catch (err) {
      console.error('Failed to load courses from storage:', err);
      localStorage.removeItem(COURSES_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
    } catch (err) {
      console.error('Failed to save courses to storage:', err);
    }
  }, [courses]);

  const handleAddCourse = () => {
    if (!title || !description || !instructor || !duration || !category) {
      setMessage('Please fill in all fields.');
      return;
    }

    const newCourse = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      instructor: instructor.trim(),
      duration: duration.trim(),
      category: category.trim(),
      createdAt: new Date().toISOString()
    };

    setCourses(prev => [...prev, newCourse]);

    // Clear form
    setTitle('');
    setDescription('');
    setInstructor('');
    setDuration('');
    setCategory('');
    setMessage('✅ Course added successfully!');
  };

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <section className="create-course">
        <h3>Create New Course</h3>
        <input
          className="input-field"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Instructor"
          value={instructor}
          onChange={e => setInstructor(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Duration (e.g. 4 weeks)"
          value={duration}
          onChange={e => setDuration(e.target.value)}
        />
        <input
          className="input-field"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <textarea
          className="textarea-field"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="add-course-btn" onClick={handleAddCourse}>Add Course</button>
        {message && <p className="message">{message}</p>}
      </section>

      <section className="existing-courses">
        <h3>Existing Courses</h3>
        {courses.length === 0 ? (
          <p>No courses yet.</p>
        ) : (
          <ul className="course-list">
            {courses.map(course => (
              <li key={course.id} className="course-item">
                <strong>{course.title}</strong> by {course.instructor} <br />
                <span className="course-meta">{course.duration} | {course.category}</span> <br />
                <small className="course-created">Created: {new Date(course.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
