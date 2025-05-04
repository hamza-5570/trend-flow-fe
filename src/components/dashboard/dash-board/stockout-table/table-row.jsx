import React from "react";

export default function TableRow({ item }) {
  const formatDate = (isoString) => {
    return new Date(isoString)?.toISOString()?.split("T")[0];
  };
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[182px] text-sm text-[#121417]">{item?.sku}</div>

      <div className="w-[200px] text-sm truncate text-[#61788A]">
        {item?.description}
      </div>

      <div className="w-[189px] text-sm text-[#61788A]">
        {formatDate(item?.stockOutDate)}
      </div>
      <div className="w-[170px] text-sm text-[#61788A]">{item?.quantity}</div>

      <div className="w-[185px] text-sm text-[#61788A]">
        {item?.weeklyDemand}
      </div>
    </div>
  );
}
