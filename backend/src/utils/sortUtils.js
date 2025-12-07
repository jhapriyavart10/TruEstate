/**
 * Sort data based on field and order
 */
export const sortData = (data, sorting) => {
  const { field, order } = sorting;
  
  const sortedData = [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (field) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
        
      case 'quantity':
        comparison = (a.quantity || 0) - (b.quantity || 0);
        break;
        
      case 'customerName':
        comparison = (a.customerName || '').localeCompare(b.customerName || '');
        break;
        
      case 'finalAmount':
        comparison = (a.finalAmount || 0) - (b.finalAmount || 0);
        break;
        
      default:
        comparison = 0;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sortedData;
};
