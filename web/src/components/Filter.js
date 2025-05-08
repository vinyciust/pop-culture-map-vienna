// src/components/Filter.js
import React from 'react';

function Filter({ categories, onFilterChange }) {
  const handleCategoryChange = (event) => {
    onFilterChange(event.target.value);  // Call parent handler with selected category
  };

  return (
    <div className="filter">
      <select onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
