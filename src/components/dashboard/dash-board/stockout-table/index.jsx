import React, { useState } from "react";
import TableHeader from "./table-header";
import TableRow from "./table-row";
import Mypaginations from "@/components/my-paginations";
import { useRouter } from "next/router";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";

export default function StockOutTable({ stockout ,setFilters,filters,setSelectedStock,selectedStock}) {
  const [currentPage, setCurrentPage] = useState(1);
  const {totalPages}=stockout?.data || {}
  const router=useRouter()
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    setFilters({
      ...filters,
      page:newPage})
    router.push({
      pathname: router.pathname, // Keeps the current path
      query: { ...router.query, page: newPage }, // Merge existing and new query args
    });
  };
    const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allAlertsIds = stockout?.data?.alerts?.map((alert) => alert._id);
      setSelectedStock(allAlertsIds);
    } else {
      setSelectedStock([]);
    }
  };
  return (
    <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
      <div className="max-w-[300px] xl:max-w-full">
        <TableHeader handleSelectAll={handleSelectAll}  />
        {stockout?.data?.alerts?.length>0 ? stockout?.data?.alerts?.map((item, index) => {
          return ( <TableRow selectedStock={selectedStock} setSelectedStock={setSelectedStock} key={index} item={item} /> )
         }):<div className="flex flex-col items-center py-4">
          <p className="text-center text-primary mt-4  font-bold">No Stockout alerts yet</p>
          <p className="text-center text-primary my-4">when items are runninglow, we'll notify you here</p>
          <Button className={'cursor-pointer'}  onClick={() => router.push("/dashboard/forecast")} >View Detailed Forcast</Button>         
         </div>}
        <div className="flex justify-center my-4 ">
          <Mypaginations
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
