import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1); // Go back
  };

  return (
    <div className="card p-3 position-relative">

      {/* ✖ Close Button (Right Side) */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "transparent",
          border: "none",
          fontSize: "22px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ✖
      </button>

      <h4>About This App</h4>
      <p>
        The <strong>Task Manager</strong> is a modern, responsive web application
        designed to help users manage daily tasks efficiently. It is built with
        <strong> React.js</strong>, <strong>Bootstrap</strong>, and uses
        <strong> LocalStorage</strong> for saving tasks.
      </p>

      <h5>Key Features:</h5>
      <ul>
        <li>Create, edit, and delete tasks easily.</li>
        <li>Organize tasks by category, priority, and due date.</li>
        <li>Mark tasks as <strong>completed</strong> or <strong>important</strong>.</li>
        <li>Manage subtasks for deeper tracking.</li>
        <li>View tasks in <strong>calendar</strong> or <strong>table</strong> format.</li>
        <li>Track progress with interactive <strong>charts</strong>.</li>
        <li>Fully responsive for mobile & desktop.</li>
        <li>Dark mode supported.</li>
      </ul>

      <h5>Technology Stack:</h5>
      <ul>
        <li><strong>Frontend:</strong> React.js, Bootstrap</li>
        <li><strong>State Management:</strong> useState, useEffect</li>
        <li><strong>Storage:</strong> LocalStorage</li>
        <li><strong>Animations:</strong> Framer Motion</li>
        <li><strong>Notifications:</strong> React-Toastify</li>
      </ul>

      <p className="mt-3">
        Designed & Developed by{" "}
        <strong>
          <a
            href="https://kavyainfoweb.com"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            Kavya Infoweb Pvt. Ltd.
          </a>
        </strong>
      </p>
    </div>
  );
}

export default About;
