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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


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


/* --------------------------- MAIN ROUTES FIXED --------------------------- */
function MainRoutes(props) {
  const { tasks, setTasks, search, setSearch, setModalTask, setFilter } = props;

  return (
    <Routes>

      {/* --- HOME / DASHBOARD ROUTE (FIXED) --- */}
      <Route
        path="/"
        element={
          <AnimatedPage>
            <Dashboard tasks={tasks} setFilter={setFilter} />
          </AnimatedPage>
        }
      />

      {/* --- TASK LIST PAGE --- */}
      <Route
        path="/tasks"
        element={
          <AnimatedPage>
            <SearchBar search={search} setSearch={setSearch} />
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div />
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

      {/* --- CALENDAR ROUTE --- */}
      <Route
        path="/calendar"
        element={
          <AnimatedPage>
            <CalendarView tasks={tasks} setModalTask={setModalTask} />
          </AnimatedPage>
        }
      />

      {/* --- CHARTS ROUTE --- */}
      <Route
        path="/charts"
        element={
          <AnimatedPage>
            <ChartsDashboard tasks={tasks} />
          </AnimatedPage>
        }
      />

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

  // NEW FILTER
  const [filter, setFilter] = useState("all");

  // FILTER LOGIC
  const filteredTasks = tasks.filter(t => {
    if (filter === "all") return true;
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    if (filter === "overdue") return t.dueDate && new Date(t.dueDate) < new Date() && !t.completed;
    return true;
  });

  /* Load default tasks only first time */
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks === null) {
      const defaultTasks = [
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

      setTasks(defaultTasks);
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
    } else {
      setTasks(JSON.parse(storedTasks));
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  /* Save tasks to storage */
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* Apply dark mode */
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
              if (!task) { setModalTask(null); return; }

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
