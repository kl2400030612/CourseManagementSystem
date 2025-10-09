import React from 'react';
import { useNavigate } from 'react-router-dom';

import AdminDashboard from './AdminDashboard.jsx';
import StudentDashboard from './StudentDashboard.jsx';

export default function Dashboard({ user, setUser }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h3>You must log in first.</h3>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={handleLogout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      {user.role === 'admin' ? (
        <AdminDashboard user={user} />
      ) : (
        <StudentDashboard user={user} />
      )}
    </div>
  );
}
