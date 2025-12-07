import React from 'react';
import '../styles/SortingDropdown.css';

const SortingDropdown = ({ sortBy, sortOrder, onSortChange }) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)', field: 'date', order: 'desc' },
    { value: 'date-asc', label: 'Date (Oldest First)', field: 'date', order: 'asc' },
    { value: 'quantity-desc', label: 'Quantity (High to Low)', field: 'quantity', order: 'desc' },
    { value: 'quantity-asc', label: 'Quantity (Low to High)', field: 'quantity', order: 'asc' },
    { value: 'customerName-asc', label: 'Customer Name (A-Z)', field: 'customerName', order: 'asc' },
    { value: 'customerName-desc', label: 'Customer Name (Z-A)', field: 'customerName', order: 'desc' },
    { value: 'finalAmount-desc', label: 'Amount (High to Low)', field: 'finalAmount', order: 'desc' },
    { value: 'finalAmount-asc', label: 'Amount (Low to High)', field: 'finalAmount', order: 'asc' }
  ];

  const currentValue = `${sortBy}-${sortOrder}`;

  const handleChange = (e) => {
    const selected = sortOptions.find(opt => opt.value === e.target.value);
    if (selected) {
      onSortChange(selected.field, selected.order);
    }
  };

  return (
    <div className="sorting-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select
        id="sort-select"
        value={currentValue}
        onChange={handleChange}
        className="sort-select"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortingDropdown;
