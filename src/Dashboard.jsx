// src/Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3>You must log in first.</h3>
        <button onClick={() => navigate('/')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.username}!</h2>
      <h3>Role: {user.role}</h3>

      {user.role === 'admin' ? (
        <div>
          <h4>Admin Dashboard</h4>
          <p>You can create and manage courses here.</p>
          {/* Later: Add course creation form here */}
        </div>
      ) : (
        <div>
          <h4>Student Dashboard</h4>
          <p>You can view and enroll in courses.</p>
          {/* Later: Add course list and enrollment UI here */}
        </div>
      )}
    </div>
  );
}
