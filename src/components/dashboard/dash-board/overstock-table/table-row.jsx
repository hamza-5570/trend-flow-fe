import Loader from "@/components/common/loader";
import { useDeleteAlertMutation } from "@/lib/services/alerts-api";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function TableRow({
  item,
  selectedOverStock,
  setSelectedOverStock,
}) {
  const [deleteAlert, { isLoading }] = useDeleteAlertMutation();
  const handleCheckboxChange = (rowId) => {
    setSelectedOverStock((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };
  const formatDate = (isoString) => {
    return new Date(isoString).toISOString().split("T")[0];
  };
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[20px] text-sm text-[#121417]">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={selectedOverStock?.includes(item._id)}
            onChange={() => handleCheckboxChange(item._id)}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="w-[100px] text-sm text-[#121417]">{item?.sku}</div>

      <div
        title={item?.description}
        className="w-[200px] truncate text-sm text-[#61788A]"
      >
        {item?.description}
      </div>

      <div className="w-[189px] text-sm text-[#61788A]">
        {formatDate(item?.stockOutDate)}
      </div>
      <div className="w-[170px] text-sm text-[#61788A]">
        {item?.quantity?.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>

      <div className="w-[185px] text-sm text-[#61788A]">
        {item?.weeklyDemand.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="w-[50px] text-sm text-[#61788A]">
        {isLoading ? (
          <Loader />
        ) : (
          <MdDelete
            size={20}
            onClick={() => deleteAlert({ id: item?.sku, type: "overstock" })}
          />
        )}
      </div>
    </div>
  );
}
