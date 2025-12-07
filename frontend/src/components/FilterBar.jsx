import React from 'react';
import FilterDropdown from './FilterDropdown';

const FilterBar = ({ filters, onFilterChange, sortBy, sortOrder, onSortChange, filterOptions, onRefresh }) => {
  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    onSortChange(field, order);
  };

  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      {/* Refresh Button */}
      <button 
        onClick={onRefresh}
        className="h-9 px-2.5 border border-[#E5E7EB] rounded-md bg-white hover:bg-gray-50 transition-colors"
        title="Refresh"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>

      {/* Customer Region */}
      <FilterDropdown
        label="Customer Region"
        value={filters.customerRegion}
        onChange={(value) => onFilterChange('customerRegion', value)}
        options={filterOptions?.customerRegions || []}
      />

      {/* Gender */}
      <FilterDropdown
        label="Gender"
        value={filters.gender}
        onChange={(value) => onFilterChange('gender', value)}
        options={filterOptions?.genders || []}
      />

      {/* Age Range */}
      <FilterDropdown
        label="Age Range"
        value={filters.ageRange}
        onChange={(value) => onFilterChange('ageRange', value)}
        options={[
          { value: '18-25', label: '18-25' },
          { value: '26-35', label: '26-35' },
          { value: '36-45', label: '36-45' },
          { value: '46-60', label: '46-60' },
          { value: '60+', label: '60+' }
        ]}
      />

      {/* Product Category */}
      <FilterDropdown
        label="Product Category"
        value={filters.productCategory}
        onChange={(value) => onFilterChange('productCategory', value)}
        options={filterOptions?.productCategories || []}
      />

      {/* Tags */}
      <FilterDropdown
        label="Tags"
        value={filters.tags}
        onChange={(value) => onFilterChange('tags', value)}
        options={[]}
      />

      {/* Payment Method */}
      <FilterDropdown
        label="Payment Method"
        value={filters.paymentMethod}
        onChange={(value) => onFilterChange('paymentMethod', value)}
        options={filterOptions?.paymentMethods || []}
      />

      {/* Date Input with placeholder */}
      <FilterDropdown
        label="Date"
        value={filters.date}
        onChange={(value) => onFilterChange('date', value)}
        options={filterOptions?.date || []}
      />
      

      {/* Sort By */}
      <select 
        className="h-9 px-3 pr-8 ml-20 border border-[#E5E7EB] rounded-md bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        onChange={(e) => handleSortChange(e.target.value)}
        value={`${sortBy}-${sortOrder}`}
      >
        <option value="customerName-asc">Sort by: Customer Name (A–Z)</option>
        <option value="customerName-desc">Sort by: Customer Name (Z–A)</option>
        <option value="date-desc">Sort by: Date (Newest)</option>
        <option value="date-asc">Sort by: Date (Oldest)</option>
        <option value="quantity-desc">Sort by: Quantity (High)</option>
        <option value="quantity-asc">Sort by: Quantity (Low)</option>
      </select>
    </div>
  );
};

export default FilterBar;
