import React, { useState } from "react";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";
import { Field, Form, Formik } from "formik";
import InputFiled from "@/components/input-filed";
import DatePickerPopover from "@/components/Date-single-picker-input";
import { Button } from "@/components/ui/button";
import {
  useGetforcastQuery,
  useLazyGetFilterDataQuery,
} from "@/lib/services/alerts-api";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoryQuery } from "@/lib/services/product-api";
import Loader from "@/components/common/loader";
import dateFormat from "dateformat";

export default function ForeCast() {
  const [filters, setFilters] = useState();
  const { isLoading, data } = useGetforcastQuery(filters);
 
  return (
    <div>
      <p className="text-2xl md:text-[32px] text-[#121417] font-bold">
        Forecasting
      </p>
      <Formik
        initialValues={{
          sku: "",
          category: "",
          startDate: "",
          endDate: "",
        }}
        onSubmit={async (values) => {
          console.log("values", values);
          try {
            setFilters({
              sku: values.sku,
              category: values.category,
              from: dateFormat(new Date(values.startDate), "yyyy-mm-dd"),
              to: dateFormat(new Date(values.endDate), "yyyy-mm-dd"),
            });
         
          } catch (error) {
            toast.error(error?.data?.error);
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
                <p className="text-base text-[#121417] font-medium">Category</p>

                {/* <Field name="category" id="category">
                  {({ field, form }) => (
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={(value) => {
                        form.setFieldValue(field.name, value);
                      }}
                    >
                      <SelectTrigger className="w-full md:w-[448px] py-6 border border-[#DBE0E5] rounded-xl text-base placeholder:text-[#637587] px-5 mt-2">
                        <SelectValue placeholder="Search  by category" />
                      </SelectTrigger>
                      <SelectContent className={"bg-white"}>
                        <SelectGroup>
                          {categoryData?.data?.map((item) => {
                            return (
                              <SelectItem value={item._id}>
                                {item.name}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                </Field> */}
                <Field
                  type="text"
                  name="category"
                  placeholder="Search  by category"
                  component={InputFiled}
                />
              </div>

              <div
                className="md:w-[448px] grid grid-cols-1 md:grid-cols-2
         gap-3 mt-5"
              >
                <div>
                  <p className="text-base text-[#121417] font-medium">From</p>
                  <DatePickerPopover name="startDate" />
                </div>

                <div>
                  <p className="text-base text-[#121417] font-medium">To</p>
                  <DatePickerPopover name="endDate" />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              disabled={!props.isValid || !props.dirty}
              className="bg-black mt-5 cursor-pointer text-white"
            >
              {isLoading ? "Loading..." : "Filter"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
        <div className="max-w-[300px] xl:max-w-full">
          <TableHeader />
          {isLoading ? (
            <div className="flex justify-center py-5">
              {" "}
              <Loader />
            </div>
          ) : data?.data?.forcast?.length > 0 ? (
            data?.data?.forcast?.map((item) => <TableRow data={item} />)
          ) : (
            <p className="flex justify-center py-5 text-sm text-[#121417] ">
              No data found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
