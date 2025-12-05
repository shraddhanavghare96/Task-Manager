import React, { useState } from "react";

function Dashboard({ tasks }) {
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Filter logic
  const getFilteredTasks = () => {
    if (!selectedFilter) return [];

    if (selectedFilter === "all") return tasks;
    if (selectedFilter === "completed") return tasks.filter(t => t.completed);
    if (selectedFilter === "pending") return tasks.filter(t => !t.completed);
    if (selectedFilter === "important") return tasks.filter(t => t.important);

    return [];
  };

  const filtered = getFilteredTasks();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>

      {/* FILTER BUTTONS */}
<div className="d-flex gap-3 mb-4">

  <button
    className="btn btn-primary filter-btn"
    onClick={() => setSelectedFilter("all")}
  >
    All Tasks
  </button>

  <button
    className="btn btn-success filter-btn"
    onClick={() => setSelectedFilter("completed")}
  >
    Completed
  </button>

  <button
    className="btn btn-warning filter-btn"
    onClick={() => setSelectedFilter("pending")}
  >
    Pending
  </button>

  <button
    className="btn btn-info filter-btn"
    onClick={() => setSelectedFilter("important")}
  >
    Important
  </button>

  <button
    className="btn btn-secondary filter-btn"
    onClick={() => setSelectedFilter(null)}
  >
    Clear
  </button>

</div>


      {/* SHOW TASKS ONLY AFTER CLICK */}
      {selectedFilter && (
        <div className="card p-3">
          <h4 className="mb-3" style={{ textTransform: "capitalize" }}>
            {selectedFilter} Tasks
          </h4>

          {filtered.length === 0 ? (
            <p>No tasks found</p>
          ) : (
            filtered.map(t => (
              <div
                key={t.id}
                className="p-2 border rounded mb-2"
                style={{ background: "#f9f9f9" }}
              >
                <strong>{t.title}</strong>
                <br />
                <small>{t.description}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
