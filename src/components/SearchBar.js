import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="form-control my-3"
      placeholder="🔍 Search tasks..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchBar;
