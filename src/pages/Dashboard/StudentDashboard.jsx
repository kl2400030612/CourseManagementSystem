import React, { useState, useEffect } from "react";
import { Storage } from "../../services/storage";
import Toast from "../../components/common/Toast";

export default function StudentDashboard({ user }) {
  const [allCourses, setAllCourses] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Load all courses
    const courses = Storage.get("courses", []);
    setAllCourses(courses);

    // Load students
    const students = Storage.get("users", []).map(u => {
      // Ensure student arrays exist
      if (!u.coursesInProgress) u.coursesInProgress = [];
      if (!u.coursesCompleted) u.coursesCompleted = [];
      return u;
    });
    Storage.set("users", students);

    // Find current student
    const current = students.find(u => u.username === user.username);
    setStudentData(current || { ...user, coursesInProgress: [], coursesCompleted: [] });
  }, [user]);

  // Update student in state & localStorage
  const updateStudent = (updated) => {
    setStudentData(updated);
    const students = Storage.get("users", []);
    const updatedStudents = students.map(u => u.username === user.username ? updated : u);
    Storage.set("users", updatedStudents);
  };

  // Join course
  const joinCourse = (courseId) => {
    if (!studentData.coursesInProgress.includes(courseId) &&
        !studentData.coursesCompleted.includes(courseId)) {
      const updated = {
        ...studentData,
        coursesInProgress: [...studentData.coursesInProgress, courseId]
      };
      updateStudent(updated);
      setToast({ message: "Joined course successfully!", type: "success" });
    }
  };

  // Mark course completed
  const completeCourse = (courseId) => {
    const updated = {
      ...studentData,
      coursesInProgress: studentData.coursesInProgress.filter(id => id !== courseId),
      coursesCompleted: [...studentData.coursesCompleted, courseId]
    };
    updateStudent(updated);
    setToast({ message: "Course marked as completed!", type: "success" });
  };

  // Re-register completed course
  const reRegisterCourse = (courseId) => {
    if (studentData.coursesCompleted.includes(courseId)) {
      const updated = {
        ...studentData,
        coursesCompleted: studentData.coursesCompleted.filter(id => id !== courseId),
        coursesInProgress: [...studentData.coursesInProgress, courseId]
      };
      updateStudent(updated);
      setToast({ message: "Course re-registered!", type: "success" });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome, {user.username}</h2>

      <section>
        <h3>Available Courses</h3>
        <ul>
          {allCourses.map(course => {
            const inProgress = studentData?.coursesInProgress.includes(course.id);
            const completed = studentData?.coursesCompleted.includes(course.id);

            return (
              <li key={course.id} style={{ marginBottom: "10px" }}>
                <strong>{course.title}</strong> by {course.creator} <br />
                {course.description} <br />
                {!inProgress && !completed && <button onClick={() => joinCourse(course.id)}>Join</button>}
                {inProgress && <button onClick={() => completeCourse(course.id)}>Mark Completed</button>}
                {completed && <button onClick={() => reRegisterCourse(course.id)}>Re-register</button>}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h3>In-Progress Courses</h3>
        <ul>
          {studentData?.coursesInProgress.map(id => {
            const c = allCourses.find(course => course.id === id);
            return <li key={id}>{c?.title || "Unknown Course"}</li>;
          })}
        </ul>
      </section>

      <section>
        <h3>Completed Courses</h3>
        <ul>
          {studentData?.coursesCompleted.map(id => {
            const c = allCourses.find(course => course.id === id);
            return <li key={id}>{c?.title || "Unknown Course"}</li>;
          })}
        </ul>
      </section>

      {toast && <Toast {...toast} />}
    </div>
  );
}
