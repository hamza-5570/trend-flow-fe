import React from "react";

export default function TableHeader({ handleSelectAllTopSelling }) {
  return (
    <div className="min-w-[1000px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[20px]">
        <label className="custom-checkbox">
          <input type="checkbox" onChange={handleSelectAllTopSelling} />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="w-[120px] text-sm text-[#121417] font-medium">SKU</div>

      <div className="w-[175px] text-sm text-[#121417] font-medium">
        Product Title
      </div>

      <div className="w-[144px] text-sm text-[#121417] font-medium">
        Total Sales
      </div>
      <div className="w-[138px] text-sm text-[#121417] font-medium">
        Units Sold
      </div>

      <div className="w-[141px] text-sm text-[#121417] font-medium">
        In Stock
      </div>
      <div className="w-[153px] text-sm text-[#121417] font-medium">
        Restock Date
      </div>
    </div>
  );
}
