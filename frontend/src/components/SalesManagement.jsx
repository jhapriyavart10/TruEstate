import React, { useState, useEffect } from 'react';
import { getSalesData, getFilterOptions, getKPIs } from '../services/salesService';
import { buildQueryParams } from '../utils/helpers';

const SalesManagement = ({ searchValue }) => {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [kpis, setKPIs] = useState({ totalUnitsSold: 0, totalRevenue: 0, totalTransactions: 0 });
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Filter state
  const [filters, setFilters] = useState({
    customerRegion: '',
    gender: '',
    ageRange: '',
    productCategory: '',
    tags: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  });
  
  const [sortBy, setSortBy] = useState('customerName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch filter options and KPIs on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [options, kpiData] = await Promise.all([
          getFilterOptions(),
          getKPIs()
        ]);
        setFilterOptions(options);
        setKPIs(kpiData);
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch sales data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = buildQueryParams(
          {
            search: searchValue,
            customerRegion: filters.customerRegion ? [filters.customerRegion] : [],
            gender: filters.gender ? [filters.gender] : [],
            productCategory: filters.productCategory ? [filters.productCategory] : [],
            paymentMethod: filters.paymentMethod ? [filters.paymentMethod] : [],
            dateFrom: filters.dateFrom,
            dateTo: filters.dateTo
          },
          sortBy,
          sortOrder,
          currentPage,
          pageSize
        );
        const result = await getSalesData(params);
        setSalesData(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue, filters, sortBy, sortOrder, currentPage]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSortChange = (value) => {
    const [field, order] = value.split('-');
    setSortBy(field);
    setSortOrder(order);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Filter and Sort Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex gap-3 flex-wrap">
          {/* Customer Region */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.customerRegion}
            onChange={(e) => setFilters({...filters, customerRegion: e.target.value})}
          >
            <option value="">Customer Region</option>
            {filterOptions?.customerRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>

          {/* Gender */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.gender}
            onChange={(e) => setFilters({...filters, gender: e.target.value})}
          >
            <option value="">Gender</option>
            {filterOptions?.genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>

          {/* Age Range */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.ageRange}
            onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
          >
            <option value="">Age Range</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46-60">46-60</option>
            <option value="60+">60+</option>
          </select>

          {/* Product Category */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.productCategory}
            onChange={(e) => setFilters({...filters, productCategory: e.target.value})}
          >
            <option value="">Product Category</option>
            {filterOptions?.productCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Tags */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.tags}
            onChange={(e) => setFilters({...filters, tags: e.target.value})}
          >
            <option value="">Tags</option>
          </select>

          {/* Payment Method */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.paymentMethod}
            onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
          >
            <option value="">Payment Method</option>
            {filterOptions?.paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>

          {/* Date */}
          <input 
            type="date"
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.dateFrom}
            onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
          />

          {/* Sort By */}
          <select 
            className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSortChange(e.target.value)}
            value={`${sortBy}-${sortOrder}`}
          >
            <option value="customerName-asc">Sort by: Customer Name (A-Z)</option>
            <option value="customerName-desc">Sort by: Customer Name (Z-A)</option>
            <option value="date-desc">Sort by: Date (Newest)</option>
            <option value="date-asc">Sort by: Date (Oldest)</option>
            <option value="quantity-desc">Sort by: Quantity (High)</option>
            <option value="quantity-asc">Sort by: Quantity (Low)</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-600 mb-1">Total units sold</div>
            <div className="text-2xl font-bold text-gray-900">{kpis.totalUnitsSold.toLocaleString()}</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-3">
            <div className="text-xs font-medium text-gray-600 mb-1">Total Amount</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{(kpis.totalRevenue / 1000).toLocaleString()} 
              <span className="text-xs font-normal text-gray-500 ml-2">({kpis.totalTransactions} SRs)</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-2">
            <div className="text-xs font-medium text-gray-600 mb-1">Total Discount</div>
            <div className="text-2xl font-bold text-gray-900">
              ₹15,000 
              <span className="text-xs font-normal text-gray-500 ml-2">(45 SRs)</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              <table className="min-w-full">
                <thead className="bg-white border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Gender</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {salesData.length > 0 ? (
                    salesData.map((sale, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.transactionId || `TXN-${index + 1}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sale.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.customerId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.customerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            {sale.phoneNumber}
                            <button onClick={() => copyToClipboard(sale.phoneNumber)} className="text-gray-400 hover:text-gray-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sale.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sale.age}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{sale.productCategory}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{sale.quantity}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination && pagination.totalPages > 0 && (
                <div className="flex items-center justify-center gap-1 py-4 border-t border-gray-100 bg-white">
                  {[...Array(Math.min(6, pagination.totalPages))].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded ${
                          currentPage === pageNum
                            ? 'bg-gray-200 text-black'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesManagement;