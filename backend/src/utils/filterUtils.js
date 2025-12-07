/**
 * Filter sales data based on multiple criteria
 */
export const filterData = (data, filters) => {
  return data.filter(item => {
    // Search filter (case-insensitive, full-text search)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const customerNameMatch = item.customerName?.toLowerCase().includes(searchLower);
      const phoneNumberMatch = item.phoneNumber?.toLowerCase().includes(searchLower);
      
      if (!customerNameMatch && !phoneNumberMatch) {
        return false;
      }
    }

    // Customer Region filter (multi-select)
    if (filters.customerRegion.length > 0) {
      if (!filters.customerRegion.includes(item.customerRegion)) {
        return false;
      }
    }

    // Gender filter (multi-select)
    if (filters.gender.length > 0) {
      if (!filters.gender.includes(item.gender)) {
        return false;
      }
    }

    // Age Range filter
    if (filters.ageRange.min !== null || filters.ageRange.max !== null) {
      const age = item.age || 0;
      
      if (filters.ageRange.min !== null && age < filters.ageRange.min) {
        return false;
      }
      
      if (filters.ageRange.max !== null && age > filters.ageRange.max) {
        return false;
      }
    }

    // Product Category filter (multi-select)
    if (filters.productCategory.length > 0) {
      if (!filters.productCategory.includes(item.productCategory)) {
        return false;
      }
    }

    // Tags filter (multi-select)
    if (filters.tags.length > 0) {
      const itemTags = item.tags ? item.tags.split(',').map(t => t.trim()) : [];
      const hasMatchingTag = filters.tags.some(tag => itemTags.includes(tag));
      
      if (!hasMatchingTag) {
        return false;
      }
    }

    // Payment Method filter (multi-select)
    if (filters.paymentMethod.length > 0) {
      if (!filters.paymentMethod.includes(item.paymentMethod)) {
        return false;
      }
    }

    // Date Range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      const itemDate = new Date(item.date);
      
      if (filters.dateRange.from && itemDate < filters.dateRange.from) {
        return false;
      }
      
      if (filters.dateRange.to && itemDate > filters.dateRange.to) {
        return false;
      }
    }

    return true;
  });
};
