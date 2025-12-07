# Retail Sales Management System - Backend

## Overview
Backend API for the Retail Sales Management System providing search, filter, sort, and pagination capabilities for sales data.

## Tech Stack
- Node.js
- Express.js
- ES6 Modules

## Project Structure
```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── utils/           # Utility functions
│   ├── routes/          # API routes
│   └── index.js         # Entry point
├── data/                # Data files (sales_data.json)
├── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your sales data:
   - Create a `data` folder in the backend directory
   - Place your `sales_data.json` file in the `data` folder
   - The system will use sample data if the file is not found

3. Configure environment:
   - Update `.env` file if needed (default port is 5000)

### Running the Server
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### GET /api/sales
Get sales data with filtering, sorting, and pagination.

**Query Parameters:**
- `search` - Search by customer name or phone number
- `customerRegion` - Filter by region (comma-separated for multiple)
- `gender` - Filter by gender (comma-separated)
- `ageMin`, `ageMax` - Age range filter
- `productCategory` - Filter by category (comma-separated)
- `tags` - Filter by tags (comma-separated)
- `paymentMethod` - Filter by payment method (comma-separated)
- `dateFrom`, `dateTo` - Date range filter (YYYY-MM-DD format)
- `sortBy` - Sort field (date, quantity, customerName, finalAmount)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalRecords": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### GET /api/sales/filters
Get available filter options from the dataset.

**Response:**
```json
{
  "customerRegions": [...],
  "genders": [...],
  "productCategories": [...],
  "tags": [...],
  "paymentMethods": [...],
  "ageRange": { "min": 18, "max": 65 },
  "dateRange": { "min": "2024-01-01", "max": "2024-12-31" }
}
```

### GET /api/health
Health check endpoint.

## Features
- ✅ Full-text search (case-insensitive)
- ✅ Multi-select filtering
- ✅ Range-based filtering (age, date)
- ✅ Multiple sort options
- ✅ Pagination with metadata
- ✅ Clean separation of concerns
- ✅ Error handling
- ✅ Sample data generation for testing

## Data Model
The system expects sales records with the following fields:
- Customer: ID, Name, Phone, Gender, Age, Region, Type
- Product: ID, Name, Brand, Category, Tags
- Sales: Quantity, Price per Unit, Discount, Total, Final Amount
- Operational: Date, Payment Method, Order Status, Delivery Type, Store Info, Employee Info
