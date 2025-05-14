import Loader from "@/components/common/loader";
import { useDeleteForcastMutation } from "@/lib/services/alerts-api";
import React from "react";
import { MdDelete } from "react-icons/md";

export default function TableRow({ data }) {
  const [deleteForcast, { isLoading }] = useDeleteForcastMutation();
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[100px] text-sm text-[#121417]">#{data?.sku}</div>

      <div title={data?.description} className="w-[160px] text-sm text-[#61788A] truncate">
        {data?.description}
      </div>

      <div className="w-[167px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.forcast_demand}
      </div>
      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_30}
      </div>

      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_60}
      </div>
      <div className="w-[134px] text-sm text-[#61788A] flex items-center justify-center">
        {data?.days_demand_90}
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
