import React from 'react';

const FilterDropdown = ({ label, value, onChange, options }) => {
  return (
    <select 
      className="h-9 px-3 pr-7 border border-[#E5E7EB] rounded-md bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none bg-no-repeat bg-right"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
        backgroundSize: '16px',
        backgroundPosition: 'right 6px center'
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{label}</option>
      {Array.isArray(options) && options.length > 0 ? (
        options.map((option) => (
          <option key={typeof option === 'string' ? option : option.value} value={typeof option === 'string' ? option : option.value}>
            {typeof option === 'string' ? option : option.label}
          </option>
        ))
      ) : null}
    </select>
  );
};

export default FilterDropdown;
