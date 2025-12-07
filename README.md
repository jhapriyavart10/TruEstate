# Retail Sales Management System

## Overview
A full-stack retail sales management system with advanced search, filtering, sorting, and pagination capabilities. Built with Node.js/Express backend and React/Vite frontend, handling 300+ sales records with efficient data processing and clean architecture following professional software engineering practices.

## Tech Stack

### Backend
- Node.js with Express.js
- ES6 Modules
- csv-parser for data loading
- CORS enabled

### Frontend
- React 18
- Vite (build tool & dev server)
- Axios (HTTP client)
- Tailwind CSS
- Modern JavaScript (ES6+)

## Search Implementation Summary
Implemented full-text case-insensitive search across Customer Name and Phone Number fields. Search query is processed on the backend using regex matching for partial text, sanitized to prevent regex injection. Works seamlessly alongside all filters and sorting, with results updating in real-time. Debounced on frontend for optimal performance.

## Filter Implementation Summary
Multi-select and range-based filtering system supporting Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date Range. Backend processes filters independently and in combination using array filtering with logical AND operations. Each filter maintains its own state and can be cleared individually. Filter options are dynamically extracted from the dataset. All filters preserve search and sort states.

## Sorting Implementation Summary
Flexible sorting supporting Date (Newest/Oldest), Quantity (High/Low), Customer Name (A-Z/Z-A), and Final Amount (High/Low). Implemented on backend using JavaScript's native sort with custom comparators for different data types (strings, numbers, dates). Sort state persists across pagination and filtering. Default sort is by date (newest first).

## Pagination Implementation Summary
Server-side pagination with 10 items per page. Backend calculates total pages, provides hasNext/hasPrevious flags, and returns paginated data slices. Frontend maintains current page state, displays page numbers with Previous/Next controls. Pagination state resets to page 1 when filters change but preserves page number during sorting. Efficient memory usage by processing only requested page data.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure dataset.csv is present in `backend/src/dataset.csv`

4. Start the backend server:
   ```bash
   npm start
   ```
   
   Backend runs on `http://localhost:5000`

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   Frontend runs on `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

### Notes
- Backend loads 300 records from CSV for optimal performance
- Uses `--max-old-space-size=4096` flag if memory issues occur with larger datasets
- Vite proxy configured to forward `/api` requests to backend
- All features (search, filter, sort, pagination) work together seamlessly
