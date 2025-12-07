import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AppSidebar from '../components/AppSidebar';
import TopBar from '../components/TopBar';
import FilterBar from '../components/FilterBar';
import StatsCard from '../components/StatsCard';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { getSalesData, getFilterOptions, getKPIs } from '../services/salesService';
import { buildQueryParams } from '../utils/helpers';

const MainPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [kpis, setKPIs] = useState({ totalUnitsSold: 0, totalRevenue: 0, totalTransactions: 0 });
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  
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
  
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Fetch filter options and KPIs on mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        console.log('📥 Fetching initial data (filter options & KPIs)...');
        const [options, kpiData] = await Promise.all([
          getFilterOptions(),
          getKPIs()
        ]);
        console.log('✅ Initial data fetched:', { options, kpiData });
        setFilterOptions(options);
        setKPIs(kpiData);
      } catch (error) {
        console.error('❌ Failed to fetch initial data:', error);
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
        console.log('📊 Fetching sales data with params:', params);
        const result = await getSalesData(params);
        console.log('✅ Sales data fetched. Records:', result.data.length, 'Pagination:', result.pagination);
        setSalesData(result.data);
        setPagination(result.pagination);
      } catch (error) {
        console.error('❌ Failed to fetch sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchValue, filters, sortBy, sortOrder, currentPage]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
  };

  const handleRefresh = () => {
    setCurrentPage(1);
    setFilters({
      customerRegion: '',
      gender: '',
      ageRange: '',
      productCategory: '',
      tags: '',
      paymentMethod: '',
      dateFrom: '',
      dateTo: ''
    });
    setSearchValue('');
  };

  return (
    <Layout>
      <AppSidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 bg-white p-8 overflow-auto">
        {/* Top Bar */}
        <TopBar searchValue={searchValue} onSearchChange={setSearchValue} />
        
        {/* Filter Bar */}
        <FilterBar 
          filters={filters}
          onFilterChange={handleFilterChange}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          filterOptions={filterOptions}
          onRefresh={handleRefresh}
        />
        
        {/* KPI Cards */}
        <div className="flex gap-3 mb-6 w-fit">
          <StatsCard 
            title="Total units sold" 
            value={kpis.totalUnitsSold.toLocaleString()} 
          />
          <StatsCard 
            title="Total Amount" 
            value={`₹${(kpis.totalRevenue / 1000).toLocaleString()}`}
            subtitle={`${kpis.totalTransactions} SRs`}
          />
          <StatsCard 
            title="Total Discount" 
            value="₹15,000"
            subtitle="45 SRs"
          />
        </div>
        
        {/* Data Table */}
        <DataTable data={salesData} loading={loading} />
        
        {/* Pagination */}
        {pagination && pagination.totalPages > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </Layout>
  );
};

export default MainPage;
