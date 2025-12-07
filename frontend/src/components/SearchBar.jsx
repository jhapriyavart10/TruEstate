import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search by customer name or phone number..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
