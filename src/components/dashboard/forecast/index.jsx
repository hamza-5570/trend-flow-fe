import React, { useState } from "react";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";
import { Field, Form, Formik } from "formik";
import InputFiled from "@/components/input-filed";
import { Button } from "@/components/ui/button";
import {
  useDeleteAllForcastMutation,
  useGetforcastQuery,
  useLazyGetFilterDataQuery,
} from "@/lib/services/alerts-api";
import { format } from "date-fns";
import { toast } from "sonner";
import Loader from "@/components/common/loader";
import dateFormat from "dateformat";
import Mypaginations from "@/components/my-paginations";
import { useRouter } from "next/router";
import { CalendarIcon, Trash } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function ForeCast() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    page: 1,
  });
  const [selectedForecast, setselectedForecast] = useState([]);
  const [deleteAllForcast,{isLoading:deleteAllForcastLoading}]=useDeleteAllForcastMutation()

  const { isLoading, data, refetch } = useGetforcastQuery(filters);
  const { totalPages } = data?.data || {};
  const router = useRouter();
  const [date, setDate] = React.useState({
    from: null,
    to: null,
  });
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);

    router.push({
      pathname: router.pathname, // Keeps the current path
      query: { ...router.query, page: newPage }, // Merge existing and new query args
    });
    setFilters({
      ...filters,
      page: newPage,
    });
  };
  // Delete all OverStock
  const handleDeleteAllForecast = async () => {
     const result=await deleteAllForcast({
        ids:selectedForecast
      }).unwrap()
    if(result.success){
     toast.success("forecast deleted successfully");
     setselectedForecast([])
    }
  };

  const handleSelectAllForcast = (e) => {
    if (e.target.checked) {
      const allForcastIds = data?.data?.forcast?.map((forcast) => forcast._id);
      setselectedForecast(allForcastIds);
    } else {
      setselectedForecast([]);
    }
  };

  return (
    <div>
      <p className="text-2xl md:text-[32px] text-[#121417] font-bold">
        Forecasting
      </p>
      <Formik
        initialValues={{
          sku: "",
          description: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={async (values) => {
          try {
            const { sku, description } = values;
            const from = date.from ? dateFormat(date.from, "yyyy-mm-dd") : null;
            const to = date.to ? dateFormat(new Date(date.to), "yyyy-mm-dd") : null;

            if (sku || description || from) {
              setFilters((prevFilters) => ({
                ...prevFilters,
                ...(sku && { sku }),
                ...(description && { description }),
                ...(from && { from }),
                ...(to && { to }),
              }));
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <div className="mt-6">
              <div>
                <p className="text-base text-[#121417] font-medium">SKU</p>
                <Field
                  type="text"
                  name="sku"
                  placeholder="Search  by SKU"
                  component={InputFiled}
                />
              </div>

              <div className="mt-6">
                <p className="text-base text-[#121417] font-medium">Keyword</p>

                <Field
                  type="text"
                  name="description"
                  placeholder="Search  by keyword"
                  component={InputFiled}
                />
              </div>
              {/* <div>
                  <p className="text-base text-[#121417] font-medium">From</p>
                  <DatePickerPopover name="startDate" />
                </div>

                <div>
                  <p className="text-base text-[#121417] font-medium">To</p>
                  <DatePickerPopover name="endDate" />
                </div> */}
              <div className="  gap-3 mt-5">
                <Popover>
                  <PopoverTrigger>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {date?.from ? (
                        date.to ? (
                          <>
                            {format(date.from, "LLL dd, y")} -{" "}
                            {format(date.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(date.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="flex gap-2  ">
              <Button
                type="submit"
                disabled={!props.isValid || !props.dirty}
                className="bg-black mt-5 cursor-pointer text-white"
              >
                {isLoading ? "Loading..." : "Filter"}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setFilters({
                    page: 1,
                  });

                  props.resetForm();
                  setTimeout(() => {
                    refetch();
                  }, 1000);
                }}
                className="bg-black mt-5 cursor-pointer text-white"
              >
                Clear Filter
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex items-center justify-end">
        <Button
          onClick={handleDeleteAllForecast}
          variant="outline"
          className={"cursor-pointer"}
        >
          {deleteAllForcastLoading ? <Loader /> : 
          <span className="flex items-center gap-2">
            <Trash size={20} /> Delete All
          </span>
          }   
        </Button>
      </div>
      <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
        <div className="max-w-[300px] xl:max-w-full">
          <TableHeader handleSelectAllForcast={handleSelectAllForcast} />
          {isLoading ? (
            <div className="flex justify-center py-5">
              {" "}
              <Loader />
            </div>
          ) : data?.data?.forcast?.length > 0 ? (
            data?.data?.forcast?.map((item) => <TableRow setselectedForecast={setselectedForecast} key={item._id} selectedForecast={selectedForecast} data={item} />)
          ) : (
            <p className="flex justify-center py-5 text-sm text-[#121417] ">
              No data found
            </p>
          )}
        </div>
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
