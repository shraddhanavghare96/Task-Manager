import React from "react";

function TaskTable({ tasks = [], deleteTask, toggleComplete, setModalTask }) {
  return (
    <div className="table-responsive mt-4">
      <table className="table table-bordered align-middle">
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
          {/* No Task Message */}
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
                <td style={{ textAlign: "left" }}>
                  <strong>{task.title}</strong>
                  <div className="small text-muted">{task.description}</div>
                </td>

                <td>{task.category || "---"}</td>
                <td>{task.priority}</td>

                <td style={{ color: overdue ? "red" : "inherit" }}>
                  {task.dueDate || "---"}
                </td>

                <td>
                  <input
                    type="checkbox"
                    checked={!!task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                </td>

                <td>
                  <div className="d-flex gap-2">
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
