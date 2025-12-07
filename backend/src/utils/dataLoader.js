import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let salesData = [];
let isLoading = false;
let isLoaded = false;

/**
 * Load and parse sales data from CSV file
 */
export const loadSalesData = async () => {
  if (isLoaded) {
    console.log('Data already loaded');
    return salesData;
  }

  if (isLoading) {
    console.log('Data is currently loading');
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (isLoaded) {
          clearInterval(checkInterval);
          resolve(salesData);
        }
      }, 100);
    });
  }

  isLoading = true;
  
  return new Promise((resolve, reject) => {
    const dataPath = path.join(__dirname, '../dataset.csv');
    const results = [];
    let count = 0;

    fs.createReadStream(dataPath)
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
        count++;
      })
      .on('end', () => {
        console.log(`Loaded ${results.length} records from CSV`);
        // Transform CSV data to normalized format
        salesData = results.map(item => ({
          transactionId: item['Transaction ID'] || item['Transaction_ID'] || item.transactionId || '',
          customerId: item['Customer ID'] || item['Customer_ID'] || item.customerId || '',
          customerName: item['Customer Name'] || item['Customer_Name'] || item.customerName || '',
          phoneNumber: item['Phone Number'] || item['Phone_Number'] || item.phoneNumber || '',
          gender: item['Gender'] || item.gender || '',
          age: parseInt(item['Age'] || item.age) || 0,
          customerRegion: item['Customer Region'] || item['Customer_Region'] || item.customerRegion || '',
          customerType: item['Customer Type'] || item['Customer_Type'] || item.customerType || '',
          productId: item['Product ID'] || item['Product_ID'] || item.productId || '',
          productName: item['Product Name'] || item['Product_Name'] || item.productName || '',
          brand: item['Brand'] || item.brand || '',
          productCategory: item['Product Category'] || item['Product_Category'] || item.productCategory || '',
          tags: item['Tags'] || item.tags || '',
          quantity: parseInt(item['Quantity'] || item.quantity) || 0,
          pricePerUnit: parseFloat(item['Price per Unit'] || item['Price_per_Unit'] || item.pricePerUnit) || 0,
          discountPercentage: parseFloat(item['Discount Percentage'] || item['Discount_Percentage'] || item.discountPercentage) || 0,
          totalAmount: parseFloat(item['Total Amount'] || item['Total_Amount'] || item.totalAmount) || 0,
          finalAmount: parseFloat(item['Final Amount'] || item['Final_Amount'] || item.finalAmount) || 0,
          date: item['Date'] || item.date || '',
          paymentMethod: item['Payment Method'] || item['Payment_Method'] || item.paymentMethod || '',
          orderStatus: item['Order Status'] || item['Order_Status'] || item.orderStatus || '',
          deliveryType: item['Delivery Type'] || item['Delivery_Type'] || item.deliveryType || '',
          storeId: item['Store ID'] || item['Store_ID'] || item.storeId || '',
          storeLocation: item['Store Location'] || item['Store_Location'] || item.storeLocation || '',
          salespersonId: item['Salesperson ID'] || item['Salesperson_ID'] || item.salespersonId || '',
          employeeName: item['Employee Name'] || item['Employee_Name'] || item.employeeName || ''
        }));
        
        isLoading = false;
        isLoaded = true;
        resolve(salesData);
      })
      .on('error', (error) => {
        console.error('Error reading CSV:', error);
        isLoading = false;
        reject(error);
      });
  });
};

/**
 * Get all sales data
 */
export const getSalesData = () => {
  return salesData;
};
