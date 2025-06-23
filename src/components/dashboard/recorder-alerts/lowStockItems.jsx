import Loader from "@/components/common/loader";
import {
  useDeleteAllAlertsMutation,
  useGetLowStockQuery,
  useStockOutAlertsQuery,
  useUpdateStockMutation,
} from "@/lib/services/alerts-api";
import ReOrderTable from "../dash-board/reorder-table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import RecordCard from "./record-card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default function LowStockItems() {
  const { data: stockout } = useStockOutAlertsQuery("stockout");
  const [filters, setFilters] = useState({
    page: 1,
    type: "reorder",
  });
  const { data: reorder, isLoading } = useStockOutAlertsQuery(filters);
  const [deleteAllAlerts, { isLoading: isloadingAlerts }] =
    useDeleteAllAlertsMutation();
  const [resetQuantity, setResetQuantity] = useState(false);
  const [selecteReOrder, setselecteReOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [updateStock, { isLoading: isLoadingUpdateStock }] =
    useUpdateStockMutation();

  const { data, isLoading: isLoadingLowStock, refetch } = useGetLowStockQuery();
  useEffect(() => {
    if (data) {
      const newData = data?.map((item) => {
        return {
          product: item?.product?._id,
          stock: 0,
        };
      });
      setCart(newData);
    }
  }, [data]);

 

  const handleDeleteAllReorder = async () => {
    const result = await deleteAllAlerts({
      type: "reorder",
      ids: selecteReOrder,
    }).unwrap();
    if (result.success) {
      toast.success("Stockout alerts deleted successfully");
      setselecteReOrder([]);
    }
  };
  console.log('reorder................',reorder)

  return (
    <div className="mt-15">

      <div>
        <div className="flex items-center justify-between w-full">
          <p className="text-[22px] font-bold text-[#121417]">Reorder Alerts</p>
          <Button
            onClick={handleDeleteAllReorder}
            variant="outline"
            className={"cursor-pointer"}
            disabled={selecteReOrder.length === 0}
          >
            {isloadingAlerts ? (
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
        ) : reorder?.data?.data?.length === 0 ? (
          <div className="h-[232px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5 px-3 md:px-0">
            <p className="text-lg text-[#121417] font-bold">
              No reorder alerts yet
            </p>

            <p className="text-sm text-[#121417] text-center pt-2">
              When items are running low, we'll notify you here
            </p>
          </div>
        ) : (
          <ReOrderTable
            reorder={reorder}
            setFilters={setFilters}
            filters={filters}
            setselecteReOrder={setselecteReOrder}
            selecteReOrder={selecteReOrder}
          />
        )}
      </div>
    </div>
  );
}
