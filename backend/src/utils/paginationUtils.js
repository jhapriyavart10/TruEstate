/**
 * Paginate data and return result with metadata
 */
export const paginateData = (data, pagination) => {
  const { page, pageSize } = pagination;
  
  const totalRecords = data.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  const paginatedData = data.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      pageSize: pageSize,
      totalRecords: totalRecords,
      totalPages: totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};
