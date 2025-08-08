import Loader from "@/components/common/loader";
import { useDeleteForcastMutation } from "@/lib/services/alerts-api";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function TableRow({
  data,
  setselectedForecast,
  selectedForecast,
}) {
  const [deleteForcast, { isLoading }] = useDeleteForcastMutation();
  const handleCheckboxChange = (rowId) => {
    setselectedForecast((prevSelected) => {
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
            checked={selectedForecast?.includes(data._id)}
            onChange={() => handleCheckboxChange(data._id)}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      <div className="w-[100px] text-sm text-[#121417]">#{data?.sku}</div>

      <div
        title={data?.description}
        className="w-[160px] text-sm text-[#61788A] truncate"
      >
        {data?.description}
      </div>

      <div className="w-[167px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.forcast_demand
          ?.toFixed(0)
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_30
          ?.toFixed(0)
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>

      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_60
          ?.toFixed(0)
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_90
          ?.toFixed(0)
          ?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </div>
      <div className="w-[50px] text-sm text-[#61788A] cursor-pointer">
        {isLoading ? (
          <Loader />
        ) : (
          <MdDelete size={20} onClick={() => deleteForcast(data?.sku)} />
        )}
      </div>
    </div>
  );
}
