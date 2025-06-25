import React from "react";

export default function TableHeader() {
  return (
    <div className="min-w-[800px] flex items-center justify-between px-5 py-3 border-b border-[#DBE0E5]">
      <div className="w-[200px] text-sm text-[#121417] font-medium">SKU</div>
      <div className="w-[200px] text-sm text-[#121417] font-medium">
        ProductId
      </div>
      <div className="w-[200px] text-sm text-[#121417] font-medium">
        ProductTitle
      </div>
       <div className="w-[100px] text-sm text-[#121417] font-medium">
        Price
      </div>
       <div className="w-[100px] text-sm text-[#121417] font-medium">
        Inventory Total
      </div>
    </div>
  );
}
