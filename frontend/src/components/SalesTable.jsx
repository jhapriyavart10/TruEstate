import React from 'react';
import { formatCurrency, formatDate } from '../utils/helpers';
import '../styles/SalesTable.css';

const SalesTable = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="sales-table-container">
      <table className="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Phone</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price/Unit</th>
            <th>Discount</th>
            <th>Final Amount</th>
            <th>Payment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sale, index) => (
            <tr key={`${sale.customerId}-${sale.productId}-${index}`}>
              <td>{formatDate(sale.date)}</td>
              <td>
                <div className="customer-info">
                  <div className="customer-name">{sale.customerName}</div>
                  <div className="customer-meta">{sale.gender}, {sale.age} • {sale.customerRegion}</div>
                </div>
              </td>
              <td>{sale.phoneNumber}</td>
              <td>
                <div className="product-info">
                  <div className="product-name">{sale.productName}</div>
                  <div className="product-brand">{sale.brand}</div>
                </div>
              </td>
              <td>
                <span className="category-badge">{sale.productCategory}</span>
              </td>
              <td className="text-center">{sale.quantity}</td>
              <td>{formatCurrency(sale.pricePerUnit)}</td>
              <td className="text-center">{sale.discountPercentage}%</td>
              <td className="amount">{formatCurrency(sale.finalAmount)}</td>
              <td>
                <span className="payment-badge">{sale.paymentMethod}</span>
              </td>
              <td>
                <span className={`status-badge status-${sale.orderStatus?.toLowerCase()}`}>
                  {sale.orderStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
