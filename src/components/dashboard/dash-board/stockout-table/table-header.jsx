import React from "react";

export default function TableHeader({handleSelectAll}) {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[20px]">
         <label className="custom-checkbox">
                  <input
                    type="checkbox"
                     onChange={handleSelectAll}
                  />
                  <span className="checkmark"></span>
                </label>
      </div>
      <div className="w-[100px] text-sm text-[#121417] font-medium">SKU</div>

      <div className="w-[200px] text-sm text-[#121417] font-medium">
        Description
      </div>

      <div className="w-[120px] text-sm text-[#121417] font-medium">
        Stockout Date
      </div>
      <div className="w-[120px] text-sm text-[#121417] font-medium">
        Qty on Hand
      </div>

      <div className="w-[120px] text-sm text-[#121417] font-medium">
        Weekly Demand
      </div>
        <div className="w-[50px] text-sm text-[#121417] font-medium">
        Action
      </div>
    </div>
  );
}
