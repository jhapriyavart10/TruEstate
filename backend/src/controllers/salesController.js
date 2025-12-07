import SalesService from '../services/salesService.js';

/**
 * Controller to handle sales data requests
 */
export const getSales = async (req, res) => {
  try {
    const {
      search = '',
      customerRegion = '',
      gender = '',
      ageMin = '',
      ageMax = '',
      productCategory = '',
      tags = '',
      paymentMethod = '',
      dateFrom = '',
      dateTo = '',
      sortBy = 'date',
      sortOrder = 'desc',
      page = '1',
      pageSize = '10'
    } = req.query;

    console.log('📥 GET /api/sales - Query params:', { search, customerRegion, gender, sortBy, sortOrder, page, pageSize });

    // Parse query parameters
    const filters = {
      search: search.trim(),
      customerRegion: customerRegion ? customerRegion.split(',').map(r => r.trim()) : [],
      gender: gender ? gender.split(',').map(g => g.trim()) : [],
      ageRange: {
        min: ageMin ? parseInt(ageMin) : null,
        max: ageMax ? parseInt(ageMax) : null
      },
      productCategory: productCategory ? productCategory.split(',').map(c => c.trim()) : [],
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      paymentMethod: paymentMethod ? paymentMethod.split(',').map(p => p.trim()) : [],
      dateRange: {
        from: dateFrom ? new Date(dateFrom) : null,
        to: dateTo ? new Date(dateTo) : null
      }
    };

    const sorting = {
      field: sortBy,
      order: sortOrder
    };

    const pagination = {
      page: parseInt(page),
      pageSize: parseInt(pageSize)
    };

    const result = await SalesService.getSalesData(filters, sorting, pagination);
    console.log('📤 Returning', result.data.length, 'records with pagination:', result.pagination);

    res.json(result);
  } catch (error) {
    console.error('❌ Error in getSales controller:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve sales data',
      message: error.message 
    });
  }
};

/**
 * Controller to get available filter options
 */
export const getFilterOptions = async (req, res) => {
  try {
    const options = await SalesService.getFilterOptions();
    res.json(options);
  } catch (error) {
    console.error('Error in getFilterOptions controller:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve filter options',
      message: error.message 
    });
  }
};

/**
 * Controller to get KPI metrics
 */
export const getKPIs = async (req, res) => {
  try {
    const kpis = await SalesService.getKPIs();
    res.json(kpis);
  } catch (error) {
    console.error('Error in getKPIs controller:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve KPIs',
      message: error.message 
    });
  }
};
