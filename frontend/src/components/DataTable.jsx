import React, { useEffect } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const DataTable = ({ data, loading }) => {
  useEffect(() => {
    console.log('📋 DataTable render - data:', data, 'loading:', loading, 'dataLength:', data?.length);
    if (data && data.length > 0) {
      console.log('📊 First row object:', data[0]);
      console.log('📊 First row keys:', Object.keys(data[0]));
    }
  }, [data, loading]);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <table className="min-w-full">
            <TableHeader />
            <tbody className="bg-white divide-y divide-[#E5E7EB]">
              {data && data.length > 0 ? (
                data.map((row, index) => {
                  console.log(`📍 Rendering row ${index}:`, row);
                  return <TableRow key={index} data={row} />;
                })
              ) : (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                    No data available (data={data}, length={data?.length})
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default DataTable;
