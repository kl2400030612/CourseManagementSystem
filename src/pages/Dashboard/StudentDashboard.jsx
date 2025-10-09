import React, { useState, useEffect } from 'react';
import './StudentDashboard.css';  // Import the CSS file

const COURSES_STORAGE_KEY = 'courses';

export default function StudentDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [joinedCourses, setJoinedCourses] = useState([]);

  const joinedStorageKey = user ? `joinedCourses_${user.username}` : null;

  useEffect(() => {
    try {
      const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
      if (savedCourses) {
        const parsedCourses = JSON.parse(savedCourses);
        if (Array.isArray(parsedCourses)) {
          setCourses(parsedCourses);
        } else {
          console.warn("Invalid course data format. Resetting.");
          localStorage.removeItem(COURSES_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading courses:", error);
      localStorage.removeItem(COURSES_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!joinedStorageKey) {
      setJoinedCourses([]);
      return;
    }

    try {
      const savedJoined = localStorage.getItem(joinedStorageKey);
      if (savedJoined) {
        const parsedJoined = JSON.parse(savedJoined);
        if (Array.isArray(parsedJoined)) {
          setJoinedCourses(parsedJoined);
        } else {
          console.warn("Invalid joined courses format. Resetting.");
          localStorage.removeItem(joinedStorageKey);
          setJoinedCourses([]);
        }
      } else {
        setJoinedCourses([]);
      }
    } catch (error) {
      console.error("Error loading joined courses:", error);
      localStorage.removeItem(joinedStorageKey);
      setJoinedCourses([]);
    }
  }, [joinedStorageKey]);

  useEffect(() => {
    if (!joinedStorageKey) return;
    try {
      localStorage.setItem(joinedStorageKey, JSON.stringify(joinedCourses));
    } catch (error) {
      console.error("Failed to save joined courses:", error);
    }
  }, [joinedCourses, joinedStorageKey]);

  const handleJoinCourse = (course) => {
    if (joinedCourses.some(c => c.id === course.id)) return;

    const joinedCourse = {
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      duration: course.duration,
      category: course.category,
      joinedAt: new Date().toISOString(),
    };

    setJoinedCourses(prev => [...prev, joinedCourse]);
  };

  const isCourseJoined = (courseId) => joinedCourses.some(c => c.id === courseId);

  if (!user) {
    return <p className="student-msg">Please login to view your dashboard.</p>;
  }

  return (
    <div className="student-dashboard">
      <h2 className="dashboard-title">Student Dashboard</h2>
      <p className="welcome-msg">Welcome, {user.username}! Browse and join courses below.</p>

      <section className="available-courses">
        <h3>Available Courses</h3>
        {courses.length === 0 ? (
          <p>No courses available.</p>
        ) : (
          <ul className="course-list">
            {courses.map(course => {
              const joined = isCourseJoined(course.id);
              return (
                <li key={course.id} className="course-item">
                  <strong>{course.title}</strong> by {course.instructor} <br />
                  <span className="course-meta">{course.duration} | {course.category}</span><br />
                  <small className="course-created">Created: {new Date(course.createdAt).toLocaleString()}</small><br />
                  {joined ? (
                    <button className="joined-btn" disabled>Joined</button>
                  ) : (
                    <button className="join-btn" onClick={() => handleJoinCourse(course)}>Join Course</button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {joinedCourses.length > 0 && (
        <section className="joined-courses">
          <h3>Your Joined Courses</h3>
          <ul className="joined-list">
            {joinedCourses.map(course => (
              <li key={course.id} className="joined-item">
                <strong>{course.title}</strong> by {course.instructor} <br />
                <span className="joined-meta">
                  Joined on: {new Date(course.joinedAt).toLocaleString()} <br />
                  Duration: {course.duration} | Category: {course.category}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
