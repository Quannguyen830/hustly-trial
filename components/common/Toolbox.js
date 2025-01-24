import React, { useState } from 'react';

const Toolbox = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="toolbox">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="sort-wrapper">
        <select onChange={handleSortChange} className="sort-select">
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="age">Age</option>
            <option value="location">Location</option>
        </select>
    </div>
    </div>
  );
};

export default Toolbox;