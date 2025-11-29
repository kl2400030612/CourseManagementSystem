import React, { useState, useEffect } from "react";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setCourses(Storage.get("courses", []));
    setUsers(Storage.get("users", []));
  }, []);

  const approveUser = (id) => {
    const updatedUsers = users.map(u => {
      if (u.id === id) {
        const approvedUser = { ...u, approved: true };

        if (approvedUser.role === "student") {
          if (!approvedUser.coursesInProgress) approvedUser.coursesInProgress = [];
          if (!approvedUser.coursesCompleted) approvedUser.coursesCompleted = [];
        }

        return approvedUser;
      }
      return u;
    });

    setUsers(updatedUsers);
    Storage.set("users", updatedUsers);
    setToast({ message: "User approved", type: "success" });
  };

  const deleteCourse = (id) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    setCourses(updatedCourses);
    Storage.set("courses", updatedCourses);
    setToast({ message: "Course deleted", type: "success" });
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section className="pending-users-section">
        <h3>Pending Users</h3>
        {users.filter(u => !u.approved).length === 0 ? (
          <p>No pending users</p>
        ) : (
          <ul className="user-list">
            {users.filter(u => !u.approved).map(u => (
              <li key={u.id} className="user-item">
                {u.username} ({u.role})
                <button className="btn-primary" onClick={() => approveUser(u.id)}>
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="all-courses-section">
        <h3>All Courses</h3>
        {courses.length === 0 ? (
          <p>No courses yet</p>
        ) : (
          <ul className="course-list">
            {courses.map(c => (
              <li key={c.id} className="course-item">
                <strong>{c.title} by {c.creator} </strong>
                {c.description} <br />
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
