# Retail Sales Management System - Frontend

## Overview
Modern React frontend application for managing and visualizing retail sales data with advanced filtering, sorting, and search capabilities.

## Tech Stack
- React 18
- Vite (Build tool)
- Axios (HTTP client)
- Custom Hooks for state management
- CSS3 for styling

## Project Structure
```
frontend/
├── src/
│   ├── components/         # React components
│   │   ├── SalesManagement.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── SalesTable.jsx
│   │   └── Pagination.jsx
│   ├── hooks/             # Custom React hooks
│   │   └── useSalesData.js
│   ├── services/          # API service layer
│   │   └── salesService.js
│   ├── utils/             # Helper functions
│   │   └── helpers.js
│   ├── styles/            # CSS stylesheets
│   ├── App.jsx            # Root component
│   └── main.jsx           # Entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Features
✅ **Search** - Real-time search by customer name or phone number  
✅ **Multi-Select Filters** - Filter by region, gender, category, tags, payment method  
✅ **Range Filters** - Age and date range filtering  
✅ **Sorting** - Sort by date, quantity, customer name, or amount  
✅ **Pagination** - Navigate through large datasets (10 items per page)  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Loading States** - User-friendly loading indicators  
✅ **Error Handling** - Graceful error messages  

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure proxy (already set in vite.config.js):
   - API calls are proxied to `http://localhost:5000`

### Running the Application

```bash
# Development mode with hot reload
npm run dev
```

The application will start on `http://localhost:3000`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Component Architecture

### Main Components

#### SalesManagement
- Container component managing overall state
- Coordinates all child components
- Uses `useSalesData` hook for data management

#### SearchBar
- Text input for searching customer names and phone numbers
- Debounced search to prevent excessive API calls
- Clear button for quick reset

#### FilterPanel
- Collapsible panel with multiple filter options
- Multi-select checkboxes for categorical filters
- Range inputs for age and date filters
- "Clear All" functionality

#### SortingDropdown
- Dropdown menu with sorting options
- Supports multiple fields and orders
- Maintains state across filter changes

#### SalesTable
- Responsive table displaying sales records
- Formatted currency and date displays
- Status badges with color coding
- Hover effects for better UX

#### Pagination
- Page number buttons with ellipsis for large datasets
- Previous/Next navigation
- Disabled state handling
- Mobile-responsive layout

### Custom Hooks

#### useSalesData
- Manages all data fetching and state
- Handles filters, sorting, and pagination
- Provides clean API for components
- Automatic refetch on dependency changes

## Styling Approach

- **CSS Variables** for consistent theming
- **Modular CSS** - One file per component
- **Responsive Design** - Mobile-first approach
- **Accessibility** - ARIA labels and semantic HTML
- **Professional UI** - Clean, minimal design

## API Integration

The frontend communicates with the backend via Axios:

```javascript
// Get sales data
GET /api/sales?search=...&customerRegion=...&sortBy=...&page=...

// Get filter options
GET /api/sales/filters
```

All API calls include proper error handling and loading states.

## State Management

- React hooks for local component state
- Custom `useSalesData` hook for data management
- No external state management library needed
- Clean separation of concerns

## Performance Optimizations

- useCallback for memoized functions
- Conditional rendering to avoid unnecessary updates
- Efficient filtering and sorting algorithms
- Pagination to limit DOM nodes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Export to CSV/Excel functionality
- Advanced analytics and charts
- Bulk actions on sales records
- Real-time updates with WebSockets
- Dark mode theme toggle
