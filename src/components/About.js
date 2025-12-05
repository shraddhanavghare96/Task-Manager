import React from "react";

function About() {
  return (
    <div className="card p-3">
      <h4>About This App</h4>
      <p>
        The <strong>Task Manager</strong> is a modern, responsive web application designed to help users manage their daily tasks efficiently. It is built with <strong>React.js</strong>, <strong>Bootstrap</strong>, and leverages <strong>LocalStorage</strong> for persistent task storage.
      </p>

      <h5>Key Features:</h5>
      <ul>
        <li>Create, edit, and delete tasks with ease.</li>
        <li>Organize tasks by category, priority, and due date.</li>
        <li>Mark tasks as <strong>completed</strong> or <strong>important</strong>.</li>
        <li>Manage subtasks for detailed task tracking.</li>
        <li>View tasks in a <strong>calendar</strong> or <strong>table</strong> format.</li>
        <li>Track progress with interactive <strong>charts</strong> and statistics.</li>
        <li>Responsive design, works seamlessly on mobile and desktop.</li>
        <li>Dark mode support for comfortable usage at night.</li>
      </ul>

      <h5>Technology Stack:</h5>
      <ul>
        <li><strong>Frontend:</strong> React.js, Bootstrap</li>
        <li><strong>State Management:</strong> React Hooks (useState, useEffect)</li>
        <li><strong>Data Storage:</strong> Browser LocalStorage</li>
        <li><strong>Animations:</strong> Framer Motion</li>
        <li><strong>Notifications:</strong> React-Toastify</li>
      </ul>

      <p>
        This app is ideal for personal productivity, task tracking, project planning, and learning how to build a full-featured React application.  
        Built by ❤️<strong><a href="https://kavyainfoweb.com" target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>KavyaInfoweb.com</a></strong>
      </p>
    </div>
  );
}

export default About;
