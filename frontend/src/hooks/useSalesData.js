import { useState, useEffect, useCallback } from 'react';
import { getSalesData, getFilterOptions } from '../services/salesService';
import { buildQueryParams } from '../utils/helpers';

/**
 * Custom hook to manage sales data fetching and state
 */
export const useSalesData = () => {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    customerRegion: [],
    gender: [],
    ageMin: '',
    ageMax: '',
    productCategory: [],
    tags: [],
    paymentMethod: [],
    dateFrom: '',
    dateTo: ''
  });

  // Sort state
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  /**
   * Fetch filter options on mount
   */
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const options = await getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
      }
    };

    fetchFilterOptions();
  }, []);

  /**
   * Fetch sales data whenever filters, sorting, or pagination changes
   */
  const fetchSalesData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = buildQueryParams(filters, sortBy, sortOrder, currentPage, pageSize);
      const result = await getSalesData(params);
      
      setSalesData(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err.message || 'Failed to fetch sales data');
      console.error('Error fetching sales data:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, sortBy, sortOrder, currentPage]);

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  /**
   * Update filters
   */
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setFilters({
      search: '',
      customerRegion: [],
      gender: [],
      ageMin: '',
      ageMax: '',
      productCategory: [],
      tags: [],
      paymentMethod: [],
      dateFrom: '',
      dateTo: ''
    });
    setCurrentPage(1);
  };

  /**
   * Update sorting
   */
  const updateSort = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  /**
   * Go to next page
   */
  const nextPage = () => {
    if (pagination && pagination.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  /**
   * Go to previous page
   */
  const previousPage = () => {
    if (pagination && pagination.hasPreviousPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  /**
   * Go to specific page
   */
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return {
    salesData,
    filterOptions,
    pagination,
    loading,
    error,
    filters,
    sortBy,
    sortOrder,
    currentPage,
    updateFilters,
    clearFilters,
    updateSort,
    nextPage,
    previousPage,
    goToPage
  };
};
