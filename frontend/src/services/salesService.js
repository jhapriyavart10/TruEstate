import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * Fetch sales data with filters, sorting, and pagination
 */
export const getSalesData = async (params) => {
  try {
    const url = `${API_BASE_URL}/sales`;
    console.log('🔌 Fetching sales data from:', url, 'with params:', params);
    const response = await axios.get(url, { params });
    console.log('✅ Sales data received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching sales data:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
};

/**
 * Fetch available filter options
 */
export const getFilterOptions = async () => {
  try {
    const url = `${API_BASE_URL}/sales/filters`;
    console.log('🔌 Fetching filter options from:', url);
    const response = await axios.get(url);
    console.log('✅ Filter options received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching filter options:', error);
    throw error;
  }
};

/**
 * Fetch KPI metrics
 */
export const getKPIs = async () => {
  try {
    const url = `${API_BASE_URL}/sales/kpis`;
    console.log('🔌 Fetching KPIs from:', url);
    const response = await axios.get(url);
    console.log('✅ KPIs received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching KPIs:', error);
    throw error;
  }
};
