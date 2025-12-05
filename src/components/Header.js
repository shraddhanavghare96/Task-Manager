import React from 'react';

function Header({ setModalTask }) {
  return (
    <header className="d-flex justify-content-between align-items-center mb-3">
      <h2>Task Manager</h2>
      <button className="btn btn-primary" onClick={() => setModalTask({})}>Add Task</button>
    </header>
  );
}

export default Header;
