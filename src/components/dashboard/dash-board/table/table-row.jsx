import React from "react";

export default function TableRow({ item,selectedTopSelling, setselectedTopSelling  }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      return "-";
    }

    return date.toISOString().split("T")[0];
  };
  
 const handleCheckboxChange = (rowId) => {
    setselectedTopSelling((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
       <div className="w-[20px] text-sm text-[#121417]">
         <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={selectedTopSelling?.includes(item._id)}
              onChange={() => handleCheckboxChange(item._id)}
            />
            <span className="checkmark"></span>
          </label>
      </div>
      <div className="w-[152px] text-sm text-[#121417]">{item.sku}</div>

      <div className="w-[145px] text-sm text-[#61788A]">{item?.category}</div>

      <div className="w-[144px] text-sm text-[#61788A]">
        ${item?.totalSalesAmount?.toFixed(2)}
      </div>
      <div className="w-[138px] text-sm text-[#61788A]">
        {item?.totalUnitsSold}
      </div>

      <div className="w-[141px] text-sm text-[#61788A]">
        {item?.stock}
      </div>
      <div className="w-[153px] text-sm text-[#61788A]">
        {formatDate(item?.stockInDate)}
      </div>
    </div>
  );
}
