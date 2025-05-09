import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[144px] text-sm text-[#121417] font-medium">SKU</div>

      <div className="w-[160px] text-sm text-[#121417] font-medium">
        Product Name
      </div>

      <div className="w-[167px] text-sm text-[#121417] font-medium">
        Forecasted Demand
      </div>
      <div className="w-[134px] text-sm text-[#121417] font-medium">
        30 Days
      </div>

      <div className="w-[134px] text-sm text-[#121417] font-medium">
        60 Days
      </div>
      <div className="w-[134px] text-sm text-[#121417] font-medium">
        90 Days
      </div>
    </div>
  );
}
