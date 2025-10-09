import React, { useState, useEffect } from 'react';

const COURSES_STORAGE_KEY = 'courses';

export default function StudentDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [joinedCourses, setJoinedCourses] = useState([]);

  // Key to store joined courses for the logged-in student
  const joinedStorageKey = `joinedCourses_${user.username}`;

  // Load all courses on mount
  useEffect(() => {
    const savedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  // Load joined courses for this student on mount
  useEffect(() => {
    const savedJoined = localStorage.getItem(joinedStorageKey);
    if (savedJoined) {
      setJoinedCourses(JSON.parse(savedJoined));
    }
  }, [joinedStorageKey]);

  // Save joined courses whenever they change
  useEffect(() => {
    localStorage.setItem(joinedStorageKey, JSON.stringify(joinedCourses));
  }, [joinedCourses, joinedStorageKey]);

  const handleJoinCourse = (courseId) => {
    if (joinedCourses.includes(courseId)) return; // Already joined

    setJoinedCourses([...joinedCourses, courseId]);
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Welcome, {user.username}! Browse and join courses below.</p>

      {courses.length === 0 ? (
        <p>No courses available right now. Check back later!</p>
      ) : (
        <ul>
          {courses.map((course) => {
            const isJoined = joinedCourses.includes(course.id);
            return (
              <li key={course.id} style={{ marginBottom: 10 }}>
                <strong>{course.title}</strong> - {course.description}
                <br />
                {isJoined ? (
                  <button disabled style={{ marginTop: 5, backgroundColor: '#4caf50', color: 'white', cursor: 'default' }}>
                    Joined
                  </button>
                ) : (
                  <button onClick={() => handleJoinCourse(course.id)} style={{ marginTop: 5 }}>
                    Join Course
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {joinedCourses.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Your Joined Courses</h3>
          <ul>
            {courses
              .filter((course) => joinedCourses.includes(course.id))
              .map((course) => (
                <li key={course.id}>{course.title}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
