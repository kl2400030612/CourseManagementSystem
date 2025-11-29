import React from "react";
import AdminDashboard from "./AdminDashboard";
import LecturerDashboard from "./LecturerDashboard";
import StudentDashboard from "./StudentDashboard";

export default function Dashboard({ user }) {
  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} />;
    case "lecturer":
      return <LecturerDashboard user={user} />;
    case "student":
      return <StudentDashboard user={user} />;
    default:
      return <p>Unknown role</p>;
  }
}
