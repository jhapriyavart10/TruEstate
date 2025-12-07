/**
 * Format currency value
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(value);
};

/**
 * Format date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Build query parameters from filters
 */
export const buildQueryParams = (filters, sortBy, sortOrder, page, pageSize) => {
  const params = {
    page,
    pageSize,
    sortBy,
    sortOrder
  };

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.customerRegion && Array.isArray(filters.customerRegion) && filters.customerRegion.length > 0) {
    params.customerRegion = filters.customerRegion.join(',');
  }

  if (filters.gender && Array.isArray(filters.gender) && filters.gender.length > 0) {
    params.gender = filters.gender.join(',');
  }

  if (filters.ageMin) {
    params.ageMin = filters.ageMin;
  }

  if (filters.ageMax) {
    params.ageMax = filters.ageMax;
  }

  if (filters.productCategory && Array.isArray(filters.productCategory) && filters.productCategory.length > 0) {
    params.productCategory = filters.productCategory.join(',');
  }

  if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
    params.tags = filters.tags.join(',');
  }

  if (filters.paymentMethod && Array.isArray(filters.paymentMethod) && filters.paymentMethod.length > 0) {
    params.paymentMethod = filters.paymentMethod.join(',');
  }

  if (filters.dateFrom) {
    params.dateFrom = filters.dateFrom;
  }

  if (filters.dateTo) {
    params.dateTo = filters.dateTo;
  }

  return params;
};
