import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[231px] text-sm text-[#121417] font-medium">Date</div>

      <div className="w-[226px] text-sm text-[#121417] font-medium">SKU</div>

      <div className="w-[229px] text-sm text-[#121417] font-medium">Units</div>

      <div className="w-[240px] text-sm text-[#121417] font-medium">
        Revenue
      </div>
    </div>
  );
}
