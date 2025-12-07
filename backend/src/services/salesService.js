import { loadSalesData, getSalesData as getLoadedData } from '../utils/dataLoader.js';
import { filterData } from '../utils/filterUtils.js';
import { sortData } from '../utils/sortUtils.js';
import { paginateData } from '../utils/paginationUtils.js';

class SalesService {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize service with data
   */
  async initialize() {
    if (!this.initialized) {
      await loadSalesData();
      this.initialized = true;
      const data = getLoadedData();
      console.log(`Loaded ${data.length} sales records`);
    }
  }

  /**
   * Get sales data with filters, sorting, and pagination
   */
  async getSalesData(filters, sorting, pagination) {
    await this.initialize();
    const salesData = getLoadedData();
    console.log('📦 SalesService.getSalesData called with:', { filters, sorting, pagination });
    console.log('📊 Total records available:', salesData.length);

    // Step 1: Filter data
    let filteredData = filterData(salesData, filters);
    console.log('🔍 After filtering:', filteredData.length, 'records');

    // Step 2: Sort data
    let sortedData = sortData(filteredData, sorting);
    console.log('📈 After sorting:', sortedData.length, 'records');

    // Step 3: Paginate data
    let paginatedResult = paginateData(sortedData, pagination);
    console.log('📄 Paginated result - returned', paginatedResult.data.length, 'records');
    if (paginatedResult.data.length > 0) {
      console.log('📍 Sample record:', paginatedResult.data[0]);
    }

    return paginatedResult;
  }

  /**
   * Get available filter options from the dataset
   */
  async getFilterOptions() {
    await this.initialize();
    const salesData = getLoadedData();

    const options = {
      customerRegions: [...new Set(salesData.map(item => item.customerRegion).filter(Boolean))].sort(),
      genders: [...new Set(salesData.map(item => item.gender).filter(Boolean))].sort(),
      productCategories: [...new Set(salesData.map(item => item.productCategory).filter(Boolean))].sort(),
      tags: [...new Set(salesData.flatMap(item => 
        item.tags ? item.tags.split(',').map(t => t.trim()) : []
      ))].sort(),
      paymentMethods: [...new Set(salesData.map(item => item.paymentMethod).filter(Boolean))].sort(),
      ageRange: {
        min: Math.min(...salesData.map(item => item.age || 0)),
        max: Math.max(...salesData.map(item => item.age || 0))
      },
      dateRange: {
        min: new Date(Math.min(...salesData.map(item => new Date(item.date).getTime()))),
        max: new Date(Math.max(...salesData.map(item => new Date(item.date).getTime())))
      }
    };

    return options;
  }

  /**
   * Get KPI metrics
   */
  async getKPIs() {
    await this.initialize();
    const salesData = getLoadedData();

    const totalUnitsSold = salesData.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalRevenue = salesData.reduce((sum, item) => sum + (item.finalAmount || 0), 0);
    const totalTransactions = salesData.length;

    return {
      totalUnitsSold,
      totalRevenue,
      totalTransactions
    };
  }
}

// Singleton instance
export default new SalesService();
