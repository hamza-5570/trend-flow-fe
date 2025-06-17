import React, { useState } from "react";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";
import {
  useDeleteAllAlertsMutation,
  useDeleteAllSaleMutation,
  useStockOutAlertsQuery,
  useTopSellingsQuery,
} from "@/lib/services/alerts-api";
import StockOutTable from "./stockout-table";
import OverStockTable from "./overstock-table";
import Loader from "@/components/common/loader";
import Mypaginations from "@/components/my-paginations";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronRight,
  Trash,
  Cross,
  X
} from "lucide-react";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    page: 1,
    type: "stockout",
  });
  const [filtersoverStock, setFiltersOverStock] = useState({
    page: 1,
    type: "overstock",
  });

  const { data: stockout, isLoading } = useStockOutAlertsQuery(filters);
  const { data: OverstockData, isLoading: overstockLoading } =
    useStockOutAlertsQuery(filtersoverStock);
  const { data: topselling, isLoading: topLoading } = useTopSellingsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [IsShowAlert, setIsShowAlert] = useState(true);
  const { totalPages } = topselling?.data?.pagination || {};
  const [deleteAllAlerts, { isLoading: isloading }] =
    useDeleteAllAlertsMutation();
  const [deleteAllSale, { isLoading: isloadingSale }] =
    useDeleteAllSaleMutation();
  const router = useRouter();
  const [selectedStock, setSelectedStock] = useState([]);
  const [selectedOverStock, setSelectedOverStock] = useState([]);
  const [selectedTopSelling, setselectedTopSelling] = useState([]);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
    router.push({
      pathname: router.pathname, // Keeps the current path
      query: { ...router.query, page: newPage }, // Merge existing and new query args
    });
  };
  // Delete all Stockout
  const handleDeleteAllStockOut = async () => {
    const result = await deleteAllAlerts({
      type: "stockout",
      ids: selectedStock,
    }).unwrap();
    if (result.success) {
      toast.success("Stockout alerts deleted successfully");
      setSelectedStock([]);
    }
  };

  // Delete all OverStock
  const handleDeleteAllOverStock = async () => {
    const result = await deleteAllAlerts({
      type: "overstock",
      ids: selectedOverStock,
    }).unwrap();
    if (result.success) {
      toast.success("Stockout alerts deleted successfully");
      setSelectedStock([]);
    }
  };

  // Delete all Top Selling

  const handleDeleteAllTopSelling = async () => {
    const result = await deleteAllSale({
      skus: selectedTopSelling,
    }).unwrap();
    if (result.success) {
      toast.success("Top Selling deleted successfully");
      setselectedTopSelling([]);
    }
  };

  const handleSelectAllTopSelling = (e) => {
    if (e.target.checked) {
      const allSkuIds = topselling?.data?.map((sell) => sell.sku);
      setselectedTopSelling(allSkuIds);
    } else {
      setselectedTopSelling([]);
    }
  };
  console.log("selectedTopSelling", selectedTopSelling);
  return (
    <div className="font-sans">
      {IsShowAlert &&  <Alert className="mb-5 shadow-lg relative  border-blue-500" title="Success Alert">
        <AlertCircleIcon />
        <AlertTitle>Remember: Check This Before Moving Forward.</AlertTitle>
        <AlertDescription>
          If the updates are not visible, please refresh the page. Ensure data
          is uploaded on both the Sales Data and Reorder Alerts pages before
          checking forecasts.
        </AlertDescription>
           <X onClick={() => setIsShowAlert(false)} title="Close" className="absolute top-2 right-2 border rounded-full border-black hover:bg-black hover:text-white cursor-pointer"/>

      </Alert>
      }

      <p className="text-[28px] md:text-[32px] text-[#121417] font-bold">
        Hi, let's get started!
      </p>

      <div className="mt-6">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#121417]">
              Stockout Alerts
            </p>
            <Button
              disabled={selectedStock.length === 0}
              onClick={handleDeleteAllStockOut}
              variant="outline"
              className={"cursor-pointer"}
            >
              {isloading ? (
                <Loader />
              ) : (
                <span className="flex items-center gap-2">
                  {" "}
                  <Trash size={20} /> Delete All
                </span>
              )}
            </Button>
          </div>

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
            <StockOutTable
              stockout={stockout}
              setFilters={setFilters}
              filters={filters}
              setSelectedStock={setSelectedStock}
              selectedStock={selectedStock}
            />
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#121417]">
              Overstock Alerts
            </p>
            <Button
              disabled={selectedOverStock.length === 0}
              onClick={handleDeleteAllOverStock}
              variant="outline"
              className={"cursor-pointer"}
            >
              {isloading ? (
                <Loader />
              ) : (
                <span className="flex items-center gap-2">
                  {" "}
                  <Trash size={20} /> Delete All
                </span>
              )}
            </Button>
          </div>
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
            <OverStockTable
              OverstockData={OverstockData}
              setFiltersOverStock={setFiltersOverStock}
              filtersoverStock={filtersoverStock}
              selectedOverStock={selectedOverStock}
              setSelectedOverStock={setSelectedOverStock}
            />
          )}
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <p className="text-[22px] font-bold text-[#121417]">
              Top Selling SKUs
            </p>
            <Button
              disabled={selectedTopSelling.length === 0}
              onClick={handleDeleteAllTopSelling}
              variant="outline"
              className={"cursor-pointer"}
            >
              {isloadingSale ? (
                <Loader />
              ) : (
                <span className="flex items-center gap-2">
                  {" "}
                  <Trash size={20} /> Delete All
                </span>
              )}
            </Button>
          </div>

          <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
            <div className="max-w-[300px] xl:max-w-full">
              <TableHeader
                handleSelectAllTopSelling={handleSelectAllTopSelling}
              />
              {topLoading ? (
                <div className="h-[300px] flex items-center justify-center">
                  <Loader />
                </div>
              ) : topselling?.data?.length === 0 ? (
                <div className="h-[232px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5 px-3 md:px-0">
                  <p className="text-lg text-[#121417] font-bold">
                    No initial Stocks yet
                  </p>

                  <button
                    onClick={() => {
                      router.push("/dashboard/reorder-alert");
                    }}
                    className="w-[195px] h-10 bg-[#F0F2F5] rounded-xl text-sm text-[#121417] font-bold cursor-pointer mt-8"
                  >
                    Add Stock
                  </button>
                </div>
              ) : (
                topselling?.data?.map((item, index) => (
                  <TableRow
                    selectedTopSelling={selectedTopSelling}
                    setselectedTopSelling={setselectedTopSelling}
                    key={index}
                    item={item}
                  />
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
