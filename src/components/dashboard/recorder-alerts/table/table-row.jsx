import React from "react";

export default function TableRow({ item }) {
  const { SKU, Productid, ProductTitle, Price, Inventory_Total } = item || {};
  console.log("item", item);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toISOString().split("T")[0];
  };

  return (
    <div className="min-w-[800px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[200px] text-sm text-[#61788A]">{SKU}</div>
      <div className="w-[200px] text-sm text-[#61788A]">{Productid}</div>
      <div className="w-[200px] text-sm text-[#61788A]">{ProductTitle}</div>
      <div className="w-[100px] text-sm text-[#61788A]">
        {Price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="w-[100px] text-sm text-[#61788A]">
        {Inventory_Total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
    </div>
  );
}
