import React from 'react';

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[10px] px-4 py-3 w-48">
      <div className="flex items-start justify-between mb-1">
        <span className="text-xs text-gray-600">{title}</span>
        <button className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50">
          <span className="text-xs">i</span>
        </button>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {subtitle && <span className="text-xs text-gray-600">({subtitle})</span>}
      </div>
    </div>
  );
};

export default StatsCard;
