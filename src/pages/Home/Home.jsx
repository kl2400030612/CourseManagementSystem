import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';  // Import the CSS

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Course Platform</h1>
      <p className="home-subtitle">Your place to learn awesome courses online!</p>

      <hr className="home-divider" />

      <h2 className="home-featured-title">Featured Courses</h2>
      <ul className="home-course-list">
        <li>React for Beginners</li>
        <li>Intro to Python Programming</li>
        <li>Web Development Bootcamp</li>
      </ul>
    </div>
  );
}
