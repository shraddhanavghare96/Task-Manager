import React from 'react';

function Filters({ filter, setFilter, sortBy, setSortBy, tasks }) {
  const categories = ["All", ...new Set(tasks.map(t => t.category))];

  return (
    <div className="d-flex justify-content-between mb-2">
      <div>
        <select className="form-select me-2 d-inline-block w-auto" value={filter.status} onChange={e => setFilter({...filter, status: e.target.value})}>
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>
        <select className="form-select me-2 d-inline-block w-auto" value={filter.priority} onChange={e => setFilter({...filter, priority: e.target.value})}>
          <option>All</option>
          <option>High</option>
          <option>Normal</option>
        </select>
        <select className="form-select me-2 d-inline-block w-auto" value={filter.category} onChange={e => setFilter({...filter, category: e.target.value})}>
          {categories.map(cat => <option key={cat}>{cat}</option>)}
        </select>
      </div>
      <div>
        <select className="form-select d-inline-block w-auto" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="recent">Recently Added</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due Date</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
