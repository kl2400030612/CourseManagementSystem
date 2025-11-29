import React, { useState, useEffect } from "react";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";
import "./LecturerDashboard.css";

export default function LecturerDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const allCourses = Storage.get("courses", []);
    const myCourses = allCourses.filter(c => c.creator === user.username);
    setCourses(myCourses);
  }, [user]);

  const addCourse = () => {
    if (!title || !description) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }

    const allCourses = Storage.get("courses", []);
    const newCourse = {
      id: Date.now(),
      title,
      description,
      creator: user.username,
      createdAt: new Date().toISOString(),
    };
    allCourses.push(newCourse);
    Storage.set("courses", allCourses);
    setCourses(prev => [...prev, newCourse]);
    setTitle("");
    setDescription("");
    setToast({ message: "Course added successfully", type: "success" });
  };

  const deleteCourse = (id) => {
    const allCourses = Storage.get("courses", []).filter(c => c.id !== id);
    Storage.set("courses", allCourses);
    setCourses(prev => prev.filter(c => c.id !== id));
    setToast({ message: "Course deleted", type: "success" });
  };

  return (
    <div className="lecturer-dashboard">
      <h2>Lecturer Dashboard</h2>

      <section className="add-course-section">
        <h3>Add New Course</h3>
        <input
          className="course-input"
          placeholder="Course Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="course-textarea"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn-primary" onClick={addCourse}>Add Course</button>
      </section>

      <section className="my-courses-section">
        <h3>My Courses</h3>
        {courses.length === 0 ? (
          <p>No courses yet.</p>
        ) : (
          <ul className="course-list">
            {courses.map(c => (
              <li key={c.id} className="course-item">
                <strong>{c.title}</strong> - {c.description} <br />
                <button className="btn-secondary" onClick={() => deleteCourse(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {toast && <Toast {...toast} />}
    </div>
  );
}
