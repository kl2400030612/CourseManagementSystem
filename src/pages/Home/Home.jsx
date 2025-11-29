import { useNavigate } from "react-router-dom";
import { Storage } from "../../services/storage";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const courses = Storage.get("courses", []);

  return (
    <div className="home-container" style={{ maxWidth: "800px", margin: "50px auto" }}>
      <header>
        <h1>Course Management System</h1>
        <p>Learn, Manage, and Track Courses Online</p>
      </header>

      <section>
        <h2>About the Platform</h2>
        <p>
          Access curated courses by expert lecturers. Students can track their
          progress and complete courses. Admin can manage all users and content.
        </p>
      </section>

      <section>
        <h2>Get Started</h2>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </section>

      <section>
        <h2>Available Courses</h2>
        {courses.length === 0 ? (
          <p>No courses available yet.</p>
        ) : (
          <ul>
            {courses.map(c => (
              <li key={c.id}>
                <strong>{c.title}</strong> by {c.creator} <br />
                {c.description}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Admin: CRUD for students, lecturers, courses</li>
          <li>Lecturer: Add / edit courses</li>
          <li>Student: View & enroll courses, track progress</li>
        </ul>
      </section>
    </div>
  );
}
