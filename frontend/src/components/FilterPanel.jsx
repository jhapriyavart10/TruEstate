import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filters, filterOptions, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!filterOptions) {
    return <div className="filter-panel">Loading filters...</div>;
  }

  const handleMultiSelectChange = (filterKey, value) => {
    const currentValues = filters[filterKey] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange({ [filterKey]: newValues });
  };

  const hasActiveFilters = () => {
    return (
      filters.customerRegion.length > 0 ||
      filters.gender.length > 0 ||
      filters.ageMin ||
      filters.ageMax ||
      filters.productCategory.length > 0 ||
      filters.tags.length > 0 ||
      filters.paymentMethod.length > 0 ||
      filters.dateFrom ||
      filters.dateTo
    );
  };

  return (
    <div className={`filter-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="filter-header">
        <h2>Filters</h2>
        <div className="filter-actions">
          {hasActiveFilters() && (
            <button className="clear-all-btn" onClick={onClearFilters}>
              Clear All
            </button>
          )}
          <button 
            className="toggle-btn" 
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse filters' : 'Expand filters'}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="filter-content">
          {/* Customer Region Filter */}
          <div className="filter-section">
            <h3>Customer Region</h3>
            <div className="filter-options">
              {filterOptions.customerRegions.map(region => (
                <label key={region} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.customerRegion.includes(region)}
                    onChange={() => handleMultiSelectChange('customerRegion', region)}
                  />
                  <span>{region}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gender Filter */}
          <div className="filter-section">
            <h3>Gender</h3>
            <div className="filter-options">
              {filterOptions.genders.map(gender => (
                <label key={gender} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleMultiSelectChange('gender', gender)}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Age Range Filter */}
          <div className="filter-section">
            <h3>Age Range</h3>
            <div className="range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={filters.ageMin}
                onChange={(e) => onFilterChange({ ageMin: e.target.value })}
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.ageMax}
                onChange={(e) => onFilterChange({ ageMax: e.target.value })}
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
              />
            </div>
          </div>

          {/* Product Category Filter */}
          <div className="filter-section">
            <h3>Product Category</h3>
            <div className="filter-options scrollable">
              {filterOptions.productCategories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.productCategory.includes(category)}
                    onChange={() => handleMultiSelectChange('productCategory', category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className="filter-section">
            <h3>Tags</h3>
            <div className="filter-options scrollable">
              {filterOptions.tags.map(tag => (
                <label key={tag} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleMultiSelectChange('tags', tag)}
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Method Filter */}
          <div className="filter-section">
            <h3>Payment Method</h3>
            <div className="filter-options">
              {filterOptions.paymentMethods.map(method => (
                <label key={method} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={filters.paymentMethod.includes(method)}
                    onChange={() => handleMultiSelectChange('paymentMethod', method)}
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div className="filter-section">
            <h3>Date Range</h3>
            <div className="date-inputs">
              <label>
                <span>From:</span>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
                />
              </label>
              <label>
                <span>To:</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => onFilterChange({ dateTo: e.target.value })}
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
