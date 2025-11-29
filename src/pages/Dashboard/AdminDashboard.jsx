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

  // Approve a user
  const approveUser = (id) => {
    const updatedUsers = users.map(u => {
      if (u.id === id) {
        const approvedUser = { ...u, approved: true };

        // Ensure student arrays exist
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

  // Delete a course
  const deleteCourse = (id) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    setCourses(updatedCourses);
    Storage.set("courses", updatedCourses);
    setToast({ message: "Course deleted", type: "success" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>Pending Users</h3>
        {users.filter(u => !u.approved).length === 0 ? (
          <p>No pending users</p>
        ) : (
          <ul>
            {users.filter(u => !u.approved).map(u => (
              <li key={u.id} style={{ marginBottom: "5px" }}>
                {u.username} ({u.role})
                <button 
                  onClick={() => approveUser(u.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Approve
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3>All Courses</h3>
        {courses.length === 0 ? (
          <p>No courses yet</p>
        ) : (
          <ul>
            {courses.map(c => (
              <li key={c.id} style={{ marginBottom: "10px" }}>
                <strong>{c.title}</strong> by {c.creator} <br />
                {c.description} <br />
                <button onClick={() => deleteCourse(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {toast && <Toast {...toast} />}
    </div>
  );
}
