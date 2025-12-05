import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } shadow-sm`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaTasks size={24} className="me-2 text-primary" />
          <span className="fw-bold">Task Manager</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/tasks">
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/calendar">
                Calendar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/charts">
                Charts
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <Link to="/contact" className="btn btn-sm btn-outline-primary">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
