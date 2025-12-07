# System Architecture & Data Flow

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         BROWSER                              │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              React Frontend (Port 3000)            │    │
│  │                                                      │    │
│  │  ┌──────────────┐  ┌──────────────┐               │    │
│  │  │ Components   │  │    Hooks     │               │    │
│  │  ├──────────────┤  ├──────────────┤               │    │
│  │  │ SearchBar    │  │ useSalesData │               │    │
│  │  │ FilterPanel  │  └──────────────┘               │    │
│  │  │ SortDropdown │                                  │    │
│  │  │ SalesTable   │  ┌──────────────┐               │    │
│  │  │ Pagination   │  │   Services   │               │    │
│  │  └──────────────┘  ├──────────────┤               │    │
│  │                    │ salesService │               │    │
│  │                    │   (Axios)    │               │    │
│  │                    └──────┬───────┘               │    │
│  └───────────────────────────┼────────────────────────┘    │
└─────────────────────────────┼──────────────────────────────┘
                              │
                              │ HTTP Requests
                              │ (GET /api/sales)
                              │
┌─────────────────────────────▼──────────────────────────────┐
│                    Node.js Backend (Port 5000)             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐ │
│  │                      Routes                          │ │
│  │              /api/sales (GET)                        │ │
│  │              /api/sales/filters (GET)                │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │                   Controllers                        │ │
│  │              getSales()                              │ │
│  │              getFilterOptions()                      │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │                    Services                          │ │
│  │              SalesService                            │ │
│  │              - getSalesData()                        │ │
│  │              - getFilterOptions()                    │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │                     Utils                            │ │
│  │              - filterData()                          │ │
│  │              - sortData()                            │ │
│  │              - paginateData()                        │ │
│  │              - loadSalesData()                       │ │
│  └────────────────────────┬─────────────────────────────┘ │
│                           │                                │
│  ┌────────────────────────▼─────────────────────────────┐ │
│  │                  Data Layer                          │ │
│  │           sales_data.json                            │ │
│  │           (or sample data)                           │ │
│  └──────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Example: User Searches and Filters

```
1. USER ACTION
   └─> Types "John" in search bar
   └─> Selects "North" region filter
   └─> Selects "Male" gender filter

2. FRONTEND (React)
   └─> useSalesData hook updates filters state
   └─> useEffect triggers on dependency change
   └─> buildQueryParams() creates URL parameters
   └─> salesService.getSalesData(params) called

3. HTTP REQUEST
   └─> GET http://localhost:5000/api/sales?
       search=John&
       customerRegion=North&
       gender=Male&
       sortBy=date&
       sortOrder=desc&
       page=1&
       pageSize=10

4. BACKEND (Express)
   └─> Route: /api/sales receives request
   └─> Controller: getSales() extracts query params
   └─> Service: SalesService.getSalesData() called

5. DATA PROCESSING
   └─> Step 1: filterData() applies all filters
       ├─> Search filter (name/phone contains "John")
       ├─> Region filter (region = "North")
       └─> Gender filter (gender = "Male")
   
   └─> Step 2: sortData() sorts by date (desc)
   
   └─> Step 3: paginateData() extracts page 1 (10 items)
       └─> Returns: { data: [...], pagination: {...} }

6. HTTP RESPONSE
   └─> JSON response sent to frontend
   
7. FRONTEND UPDATE
   └─> setState updates component
   └─> SalesTable re-renders with new data
   └─> Pagination updates with new totals
   └─> Loading spinner disappears
```

---

## 📦 Component Hierarchy

```
App
 │
 └─── SalesManagement
       │
       ├─── SearchBar
       │     └─ input (controlled by filters.search)
       │
       ├─── FilterPanel
       │     ├─ CustomerRegion (checkboxes)
       │     ├─ Gender (checkboxes)
       │     ├─ AgeRange (inputs)
       │     ├─ ProductCategory (checkboxes)
       │     ├─ Tags (checkboxes)
       │     ├─ PaymentMethod (checkboxes)
       │     └─ DateRange (date inputs)
       │
       ├─── ControlsBar
       │     ├─ ResultsInfo
       │     └─ SortingDropdown
       │
       ├─── SalesTable
       │     └─ TableRows (mapped from data)
       │
       └─── Pagination
             ├─ Previous button
             ├─ Page numbers
             └─ Next button
```

---

## 🔌 API Endpoints Detail

### 1. GET /api/sales

**Purpose**: Retrieve filtered, sorted, and paginated sales data

**Parameters**:
```javascript
{
  // Search
  search: string,
  
  // Multi-select filters (comma-separated)
  customerRegion: string,
  gender: string,
  productCategory: string,
  tags: string,
  paymentMethod: string,
  
  // Range filters
  ageMin: number,
  ageMax: number,
  dateFrom: date (YYYY-MM-DD),
  dateTo: date (YYYY-MM-DD),
  
  // Sorting
  sortBy: 'date' | 'quantity' | 'customerName' | 'finalAmount',
  sortOrder: 'asc' | 'desc',
  
  // Pagination
  page: number,
  pageSize: number
}
```

**Response**:
```javascript
{
  data: [
    {
      customerId: string,
      customerName: string,
      phoneNumber: string,
      gender: string,
      age: number,
      customerRegion: string,
      customerType: string,
      productId: string,
      productName: string,
      brand: string,
      productCategory: string,
      tags: string,
      quantity: number,
      pricePerUnit: number,
      discountPercentage: number,
      totalAmount: number,
      finalAmount: number,
      date: string,
      paymentMethod: string,
      orderStatus: string,
      deliveryType: string,
      storeId: string,
      storeLocation: string,
      salespersonId: string,
      employeeName: string
    }
  ],
  pagination: {
    currentPage: number,
    pageSize: number,
    totalRecords: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
  }
}
```

### 2. GET /api/sales/filters

**Purpose**: Get all available filter options from dataset

**Response**:
```javascript
{
  customerRegions: string[],
  genders: string[],
  productCategories: string[],
  tags: string[],
  paymentMethods: string[],
  ageRange: {
    min: number,
    max: number
  },
  dateRange: {
    min: date,
    max: date
  }
}
```

---

## 🎯 State Management Flow

```
┌─────────────────────────────────────────────────────────┐
│                  useSalesData Hook                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATE:                                                 │
│  ├─ salesData (array)                                  │
│  ├─ filterOptions (object)                             │
│  ├─ pagination (object)                                │
│  ├─ loading (boolean)                                  │
│  ├─ error (string)                                     │
│  ├─ filters (object)                                   │
│  │   ├─ search                                         │
│  │   ├─ customerRegion                                 │
│  │   ├─ gender                                         │
│  │   ├─ ageMin, ageMax                                 │
│  │   ├─ productCategory                                │
│  │   ├─ tags                                           │
│  │   ├─ paymentMethod                                  │
│  │   └─ dateFrom, dateTo                               │
│  ├─ sortBy (string)                                    │
│  ├─ sortOrder (string)                                 │
│  └─ currentPage (number)                               │
│                                                         │
│  ACTIONS:                                              │
│  ├─ updateFilters(newFilters)                         │
│  ├─ clearFilters()                                     │
│  ├─ updateSort(field, order)                          │
│  ├─ nextPage()                                        │
│  ├─ previousPage()                                     │
│  └─ goToPage(page)                                     │
│                                                         │
│  EFFECTS:                                              │
│  └─ useEffect([filters, sortBy, sortOrder, page])     │
│      └─ Triggers fetchSalesData()                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Filter Logic Flow

```javascript
// Input: Full dataset + filters object
// Output: Filtered dataset

function filterData(data, filters) {
  return data.filter(item => {
    
    // 1. Search Filter (OR logic)
    if (filters.search) {
      if (!item.customerName.includes(search) &&
          !item.phoneNumber.includes(search)) {
        return false; // ❌ Exclude
      }
    }
    
    // 2. Region Filter (AND logic with multi-select)
    if (filters.customerRegion.length > 0) {
      if (!filters.customerRegion.includes(item.customerRegion)) {
        return false; // ❌ Exclude
      }
    }
    
    // 3. Gender Filter (similar to region)
    // 4. Age Range Filter (min/max check)
    // 5. Category Filter (similar to region)
    // 6. Tags Filter (check if any tag matches)
    // 7. Payment Method Filter
    // 8. Date Range Filter (min/max check)
    
    return true; // ✅ Include
  });
}
```

---

## 📊 Data Transformation Pipeline

```
Raw Data (JSON file)
      │
      ▼
┌─────────────────┐
│  Load & Parse   │ ← dataLoader.js
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Normalize     │ ← Convert field names to camelCase
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Filter      │ ← filterUtils.js
└────────┬────────┘ ← Apply search + all active filters
         │
         ▼
┌─────────────────┐
│      Sort       │ ← sortUtils.js
└────────┬────────┘ ← Sort by selected field & order
         │
         ▼
┌─────────────────┐
│    Paginate     │ ← paginationUtils.js
└────────┬────────┘ ← Extract current page (10 items)
         │
         ▼
   Final Result + Metadata
```

---

## 🎨 UI Component Communication

```
SalesManagement (Parent)
     │
     ├─ Provides: filters, sortBy, pagination
     ├─ Provides: updateFilters(), updateSort(), etc.
     │
     ├─► SearchBar
     │    └─ Calls: updateFilters({ search: value })
     │
     ├─► FilterPanel
     │    └─ Calls: updateFilters({ region: [...] })
     │
     ├─► SortingDropdown
     │    └─ Calls: updateSort(field, order)
     │
     ├─► SalesTable
     │    └─ Displays: salesData prop
     │
     └─► Pagination
          └─ Calls: nextPage(), previousPage(), goToPage()
```

---

## 🔐 Error Handling Flow

```
API Request
    │
    ├─ Success ✅
    │   └─> Update state with data
    │       └─> Hide loading spinner
    │           └─> Display results
    │
    └─ Error ❌
        ├─> Network Error
        │   └─> Display: "Failed to connect to server"
        │
        ├─> 500 Server Error
        │   └─> Display: Error message from response
        │
        └─> Timeout
            └─> Display: "Request timed out"
```

---

## 🚀 Performance Optimizations

```
Frontend:
  ├─ useCallback for memoized functions
  ├─ Conditional rendering (avoid unnecessary updates)
  ├─ CSS instead of heavy UI libraries
  └─ Efficient state updates

Backend:
  ├─ In-memory data (fast access)
  ├─ Efficient filter algorithms
  ├─ Pagination to limit response size
  └─ No database overhead (for this scope)
```

---

## 📱 Responsive Breakpoints

```
Desktop (> 1024px)
  ├─ Filter panel: Fixed left sidebar
  ├─ Table: All columns visible
  └─ Pagination: Full inline

Tablet (768px - 1024px)
  ├─ Filter panel: Collapsible
  ├─ Table: Horizontal scroll
  └─ Pagination: Adjusted spacing

Mobile (< 768px)
  ├─ Filter panel: Collapsed by default
  ├─ Table: Horizontal scroll + reduced padding
  ├─ Search: Full width
  └─ Pagination: Stacked layout
```

---

This architecture ensures:
- ✅ Clean separation of concerns
- ✅ Maintainable code structure
- ✅ Efficient data flow
- ✅ Scalable design
- ✅ Professional implementation
