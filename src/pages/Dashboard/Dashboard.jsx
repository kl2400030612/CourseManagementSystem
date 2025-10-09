import React from 'react';
import { useNavigate } from 'react-router-dom';

import AdminDashboard from './AdminDashboard.jsx';
import StudentDashboard from './StudentDashboard.jsx';

export default function Dashboard({ user }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3>You must log in first.</h3>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {user.role === 'admin' ? (
        <AdminDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
}
