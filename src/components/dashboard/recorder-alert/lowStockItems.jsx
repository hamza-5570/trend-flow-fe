import Loader from "@/components/common/loader";
import {
  useGetLowStockQuery,
  useStockOutAlertsQuery,
  useUpdateStockMutation,
} from "@/lib/services/alerts-api";
import ReOrderTable from "../dash-board/reorder-table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import RecordCard from "./record-card";
import { Button } from "@/components/ui/button";

export default function LowStockItems() {
  const { data: stockout } = useStockOutAlertsQuery("stockout");
      const [filters, setFilters] = useState({
        page: 1,
        type: "reorder",
      });
  const { data: reorder, isLoading } = useStockOutAlertsQuery(filters);
  const [resetQuantity, setResetQuantity] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateStock({ update: cart }).unwrap();
    if (res) {
      toast.success(res?.message);
      const newData = data?.map((item) => {
        return {
          product: item?.product?._id,
          stock: 0,
        };
      });
      setCart(newData);
      setResetQuantity(true);
      refetch();
    }
  };
  return (
    <div className="mt-5">
      {/* <p className="text-lg text-[#121417] font-bold">
        7 items need to be reordere
      </p> */}

      {/* <div className="mb-10">
        <form onSubmit={handleSubmit}>
          {isLoadingLowStock ? (
            <Loader />
          ) : stockout?.message?.alert?.length > 0 ? (
            stockout.message?.alert?.map((item, i) => (
              <RecordCard
                key={i}
                id={item?.product?._id}
                item={item}
                cart={cart}
                setCart={setCart}
                resetQuantity={resetQuantity}
                setResetQuantity={setResetQuantity}
              />
            ))
          ) : (
            <p className="text-lg text-[#121417] font-bold">
              No low stock alerts yet
            </p>
          )}

          {stockout?.message?.alert?.length > 0 && (
            <Button
              type="submit"
              className={"float-right my-4 cursor-pointer hover:opacity-90"}
            >
              {isLoadingUpdateStock ? <Loader /> : "Submit"}
            </Button>
          )}
        </form>
      </div> */}
      <div>
        <p className="text-[22px] font-bold text-[#121417]">Reorder Alerts</p>

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
          <ReOrderTable reorder={reorder} setFilters={setFilters}  filters={filters}/>
        )}
      </div>
    </div>
  );
}
