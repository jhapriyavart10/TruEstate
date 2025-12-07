import React from 'react';

const TableHeader = () => {
  return (
    <thead className="bg-[#F5F6F8]">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Transaction ID
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Date
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Customer ID
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Customer name
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Phone Number
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Gender
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Age
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Product Category
        </th>
        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
          Quantity
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
