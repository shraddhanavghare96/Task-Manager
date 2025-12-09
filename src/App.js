import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import TaskTable from "./components/TaskTable";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import ChartsDashboard from "./components/ChartsDashboard";
import CalendarView from "./components/CalendarView";
import Settings from "./components/Settings";
import About from "./components/About";
import Contact from "./components/Contact";

import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

import "./App.css";

import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


/* --------------------------- ANIMATED PAGE WRAPPER --------------------------- */
function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  );
}


/* --------------------------- MAIN ROUTES (INSIDE SAME FILE) --------------------------- */
function MainRoutes({ tasks, setTasks, search, setSearch, setModalTask, setFilter }) {
  return (
    <Routes>

      {/* HOME / DASHBOARD */}
      <Route
        path="/"
        element={
          <AnimatedPage>
            <Dashboard tasks={tasks} setFilter={setFilter} />
          </AnimatedPage>
        }
      />

      {/* TASK PAGE */}
      <Route
        path="/tasks"
        element={
          <AnimatedPage>
            <SearchBar search={search} setSearch={setSearch} />

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div></div>

              <button className="btn btn-primary" onClick={() => setModalTask({})}>
                + Add Task
              </button>
            </div>

            <TaskTable
              tasks={tasks.filter(t =>
                t.title?.toLowerCase().includes(search.toLowerCase())
              )}
              deleteTask={(id) => {
                setTasks(prev => prev.filter(t => t.id !== id));
                toast.error("Task deleted");
              }}
              toggleComplete={(id) =>
                setTasks(prev =>
                  prev.map(t =>
                    t.id === id ? { ...t, completed: !t.completed } : t
                  )
                )
              }
              toggleImportant={(id) =>
                setTasks(prev =>
                  prev.map(t =>
                    t.id === id ? { ...t, important: !t.important } : t
                  )
                )
              }
              setModalTask={(t) => setModalTask(t)}
              toggleSubtask={(taskId, subtaskId) =>
                setTasks(prev =>
                  prev.map(t => {
                    if (t.id !== taskId) return t;

                    const updated = (t.subtasks || []).map(s =>
                      s.id === subtaskId ? { ...s, done: !s.done } : s
                    );

                    const completed =
                      updated.length > 0 && updated.every(s => s.done);

                    return { ...t, subtasks: updated, completed };
                  })
                )
              }
            />
          </AnimatedPage>
        }
      />

      {/* CALENDAR */}
      <Route
        path="/calendar"
        element={
          <AnimatedPage>
            <CalendarView tasks={tasks} setModalTask={setModalTask} />
          </AnimatedPage>
        }
      />

      {/* CHARTS */}
      <Route
        path="/charts"
        element={
          <AnimatedPage>
            <ChartsDashboard tasks={tasks} />
          </AnimatedPage>
        }
      />

      {/* OTHER ROUTES */}
      <Route path="/settings" element={<AnimatedPage><Settings /></AnimatedPage>} />
      <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
      <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />

      <Route path="*" element={<AnimatedPage><div>Page not found</div></AnimatedPage>} />
    </Routes>
  );
}


/* --------------------------- APP WRAPPER --------------------------- */
function AppWrapper() {
  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [filter, setFilter] = useState("all");

  // Filtering logic
  const filteredTasks = tasks.filter(t => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    if (filter === "overdue") return t.dueDate && new Date(t.dueDate) < new Date() && !t.completed;
    return true;
  });

  /* Load tasks */
  useEffect(() => {
    const saved = localStorage.getItem("tasks");

    if (!saved) {
      const defaults = [
        {
          id: 1,
          title: "Prepare Project Report",
          description: "Complete the project documentation",
          category: "Work",
          priority: "High",
          dueDate: "2025-01-10",
          completed: false,
          important: true
        },
        {
          id: 2,
          title: "Buy Groceries",
          description: "Milk, vegetables, fruits",
          category: "Personal",
          priority: "Normal",
          dueDate: "2025-01-05",
          completed: false,
          important: false
        },
        {
          id: 3,
          title: "Study React Hooks",
          description: "Practice useState and useEffect",
          category: "Learning",
          priority: "High",
          dueDate: "2025-01-08",
          completed: false,
          important: true
        }
      ];

      setTasks(defaults);
      localStorage.setItem("tasks", JSON.stringify(defaults));
    } else {
      setTasks(JSON.parse(saved));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Dark mode
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "";
  }, [darkMode]);


  return (
    <Router>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => {
          const nm = !darkMode;
          setDarkMode(nm);
          localStorage.setItem("theme", nm ? "dark" : "light");
        }}
      />

      <div className="container mt-4">
        <MainRoutes
          tasks={filteredTasks}
          setTasks={setTasks}
          search={search}
          setSearch={setSearch}
          setModalTask={setModalTask}
          setFilter={setFilter}
        />

        {modalTask && (
          <TaskForm
            task={modalTask}
            saveTask={(task) => {
              if (!task) return setModalTask(null);

              if (task.id) {
                setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...task } : t));
                toast.success("Task updated");
              } else {
                const newTask = { ...task, id: Date.now(), createdAt: new Date().toISOString() };
                setTasks(prev => [...prev, newTask]);
                toast.success("Task added");
              }
              setModalTask(null);
            }}
          />
        )}
      </div>

      <Footer />
      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default AppWrapper;
