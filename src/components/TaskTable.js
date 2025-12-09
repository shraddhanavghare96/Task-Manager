import React from "react";

function TaskTable({ tasks = [], deleteTask, toggleComplete, setModalTask }) {
  return (
    <div className="table-responsive mt-4 tasktable-responsive">
      <table className="table table-bordered align-middle task-table">
        <thead className="table-light">
          <tr>
            <th style={{ width: "40%" }}>Title</th>
            <th style={{ width: "15%" }}>Category</th>
            <th style={{ width: "10%" }}>Priority</th>
            <th style={{ width: "15%" }}>Due Date</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No tasks found.
              </td>
            </tr>
          )}

          {tasks.map((task) => {
            const overdue =
              task.dueDate &&
              new Date(task.dueDate) < new Date() &&
              !task.completed;

            return (
              <tr key={task.id} className={task.completed ? "table-success" : ""}>
                <td data-label="Title" style={{ textAlign: "left" }}>
                  <strong>{task.title}</strong>
                  <div className="small text-muted">{task.description}</div>
                </td>

                <td data-label="Category">{task.category || "---"}</td>
                <td data-label="Priority">{task.priority}</td>

                <td
                  data-label="Due Date"
                  style={{ color: overdue ? "red" : "inherit" }}
                >
                  {task.dueDate || "---"}
                </td>

                {/* STATUS COLUMN */}
                <td data-label="Status" className="text-center">
                  {!task.completed && (
                    <i
                      className="bi bi-check-circle-fill"
                      style={{ color: "green", fontSize: "1.4rem" }}
                      title="Active"
                    />
                  )}
                  {task.completed && (
                    <i
                      className="bi bi-check2-square"
                      style={{ color: "gray", fontSize: "1.4rem" }}
                      title="Completed"
                    />
                  )}

                  <div>
                    <input
                      type="checkbox"
                      checked={!!task.completed}
                      onChange={() => toggleComplete(task.id)}
                    />
                  </div>
                </td>

                {/* ACTIONS */}
                <td data-label="Actions">
                  <div className="d-flex flex-wrap gap-2 action-buttons">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => setModalTask(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
