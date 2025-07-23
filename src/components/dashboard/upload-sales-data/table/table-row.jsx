import React from "react";

export default function TableRow({ item }) {
  const { SKU, Sales, UnitsSold, SaleDate, Price } = item || {};

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-w-[800px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[200px] text-sm text-[#61788A]">
        {formatDate(SaleDate)}
      </div>

      <div className="w-[200px] text-sm text-[#61788A]">{SKU}</div>

      <div className="w-[200px] text-sm text-[#61788A]">{UnitsSold}</div>
      <div className="w-[200px] text-sm text-[#61788A]">
        ${UnitsSold * Price}
      </div>
    </div>
  );
}
