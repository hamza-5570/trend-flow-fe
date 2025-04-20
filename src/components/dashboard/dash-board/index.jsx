import React, { useState } from "react";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";
import {
  useStockOutAlertsQuery,
  useTopSellingsQuery,
} from "@/lib/services/alerts-api";
import StockOutTable from "./stockout-table";
import OverStockTable from "./overstock-table";
import Loader from "@/components/common/loader";
import Mypaginations from "@/components/my-paginations";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: stockout, isLoading } = useStockOutAlertsQuery("stockout");
  const { data: OverstockData, isLoading: overstockLoading } =
    useStockOutAlertsQuery("overstock");
  const { data: topselling, isLoading: topLoading } = useTopSellingsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalPages } = topselling?.data?.pagination || {};
  const router = useRouter();

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push({
      pathname: router.pathname, // Keeps the current path
      query: { ...router.query, page: newPage }, // Merge existing and new query args
    });
  };
  return (
    <div className="font-sans">
      <p className="text-[28px] md:text-[32px] text-[#121417] font-bold">
        Hi, let's get started!
      </p>

      <div className="mt-6">
        <div>
          <p className="text-[22px] font-bold text-[#121417]">
            Stockout Alerts
          </p>

          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader />
            </div>
          ) : stockout?.data?.data?.length === 0 ? (
            <div className="h-[232px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5 px-3 md:px-0">
              <p className="text-lg text-[#121417] font-bold">
                No stockout alerts yet
              </p>

              <p className="text-sm text-[#121417] text-center pt-2">
                When items are running low, we'll notify you here
              </p>

              <button className="w-[195px] h-10 bg-[#F0F2F5] rounded-xl text-sm text-[#121417] font-bold cursor-pointer mt-8">
                View Detailed Forecast
              </button>
            </div>
          ) : (
            <StockOutTable stockout={stockout} />
          )}
        </div>

        <div className="mt-8">
          <p className="text-[22px] font-bold text-[#121417]">
            Overstock Alerts
          </p>
          {overstockLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Loader />
            </div>
          ) : OverstockData?.data?.data?.length === 0 ? (
            <div className="h-[232px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5 px-3 md:px-0">
              <p className="text-lg text-[#121417] font-bold">
                No stockout alerts yet
              </p>

              <p className="text-sm text-[#121417] text-center pt-2">
                When items are overstocked, we'll notify you here
              </p>

              <button className="w-[195px] h-10 bg-[#F0F2F5] rounded-xl text-sm text-[#121417] font-bold cursor-pointer mt-8">
                View Detailed Forecast
              </button>
            </div>
          ) : (
            <OverStockTable OverstockData={OverstockData} />
          )}
        </div>
        <div className="mt-8">
          <p className="text-[22px] font-bold text-[#121417]">
            Top Selling SKUs
          </p>

          <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
            <div className="max-w-[300px] xl:max-w-full">
              <TableHeader />
              {topLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader />
                </div>
              ) : topselling?.data?.length === 0 ? (
                <div className="h-[300px] items-center justify-center text-sm">
                  No Selling Found
                </div>
              ) : (
                topselling?.data?.map((item, index) => (
                  <TableRow key={index} item={item} />
                ))
              )}

              <div className="flex justify-center my-4 ">
                <Mypaginations
                  count={totalPages}
                  page={currentPage}
                  onChange={onPageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
