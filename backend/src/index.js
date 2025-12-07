import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salesRoutes from './routes/salesRoutes.js';
import { loadSalesData } from './utils/dataLoader.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/sales', salesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// Load data and start server
const startServer = async () => {
  try {
    console.log('📂 Loading CSV data...');
    await loadSalesData();
    console.log('✅ CSV data loaded successfully');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to load data:', error);
    process.exit(1);
  }
};

startServer();

export default app;
