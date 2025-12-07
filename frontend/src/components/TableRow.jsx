import React, { useEffect } from 'react';

const TableRow = ({ data }) => {
  useEffect(() => {
    console.log('📍 TableRow rendering with data:', data);
  }, [data]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {data.transactionId || 'N/A'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {data.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {data.customerId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {data.customerName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span>{data.phoneNumber}</span>
          <button 
            onClick={() => copyToClipboard(data.phoneNumber)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {data.gender}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {data.age}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {data.productCategory}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
        {String(data.quantity).padStart(2, '0')}
      </td>
    </tr>
  );
};

export default TableRow;
