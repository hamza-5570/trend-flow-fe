import Loader from "@/components/common/loader";
import { useDeleteForcastMutation } from "@/lib/services/alerts-api";
import React from "react";
import {MdDelete} from "react-icons/md";

export default function TableRow({data}) {
  const [deleteForcast,{isLoading}]=useDeleteForcastMutation()
  return (
    <div className="min-w-[1000px] flex items-center justify-between border-b border-[#DBE0E5] p-5">
      <div className="w-[144px] text-sm text-[#121417]">#{data?.sku}</div>
            <div className="w-[80px] text-sm text-[#61788A] truncate">{data?.category}</div>

      <div className="w-[80px] text-sm text-[#61788A] truncate">{data?.description}</div>


      <div className="w-[167px] text-sm text-[#61788A]">{data?.forcast_demand}</div>
      <div className="w-[134px] text-sm text-[#61788A]">{data?.days_demand_30}</div>

      <div className="w-[134px] text-sm text-[#61788A]">{data?.days_demand_60}</div>
      <div className="w-[134px] text-sm text-[#61788A]">{data?.days_demand_90}</div>
      <div className="w-[34px] text-sm text-[#61788A] cursor-pointer">{isLoading ? <Loader/> : <MdDelete size={20} onClick={()=>deleteForcast(data?.sku)}/>}</div>

    </div>
  );
}
