import express from 'express';
import { getSales, getFilterOptions, getKPIs } from '../controllers/salesController.js';

const router = express.Router();

// Get sales data with search, filter, sort, and pagination
router.get('/', getSales);

// Get available filter options
router.get('/filters', getFilterOptions);

// Get KPI metrics
router.get('/kpis', getKPIs);

// Debug endpoint to check data structure
router.get('/debug/sample', async (req, res) => {
  try {
    const { getSalesData } = await import('../utils/dataLoader.js');
    const data = getSalesData();
    if (data.length === 0) {
      return res.json({ message: 'No data loaded yet', count: 0 });
    }
    res.json({
      totalRecords: data.length,
      sampleRecord: data[0],
      keys: Object.keys(data[0])
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
