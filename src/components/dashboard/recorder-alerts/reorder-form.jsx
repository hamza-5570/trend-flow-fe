import Loader from "@/components/common/loader";
import InputFiled from "@/components/input-filed";
import { Button } from "@/components/ui/button";
import { useGetInventoryQuery } from "@/lib/services/auth-api";
import { Field, useFormikContext } from "formik";
import React, { useState } from "react";
import { useCreateProductMutation } from "@/lib/services/product-api";
import * as XLSX from "xlsx";
import DownloadTemplate from "@/components/download-template";
import sampleData from "../../../data/reorder-data.json";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";

const headerData = [
  { label: "SKU", key: "SKU" },
  { label: "ProductId", key: "Productid" },
  { label: "Size", key: "Size" },
  { label: "Color", key: "Color" },
  { label: "ProductTitle", key: "ProductTitle" },
  { label: "Category", key: "Category" },
  { label: "Subcategory", key: "Subcategory" },
  { label: "Material", key: "Material" },
  { label: "Gender_Age", key: "Gender_Age" },
  { label: "Inventory_Total", key: "Inventory_Total" },
  { label: "Price", key: "Price" },
];

export default function ReorderForm({ isloading, refetch }) {
  const [fileInfo, setFileInfo] = useState(null);
  const { values, setFieldValue } = useFormikContext();
  const [data, setData] = useState([]);

  const [creatingCSV, { isLoading: isCreatingCSV }] =
    useCreateProductMutation();
  const handleFileChange = async (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      setFileInfo(e?.target?.files[0]);
      setFieldValue("file", e?.target?.files[0]);
    }
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (event) => {
      const buffer = new Uint8Array(event.target.result);
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setData(data);
    };
    console.log("e.target.files[0]", e.target.files[0]);
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.length > 0) {
      setFileInfo(e?.dataTransfer?.files[0]);
      setFieldValue("file", e?.dataTransfer?.files[0]);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-2xl md:text-[32px] text-[#121417] font-bold">
          Reorder Alerts
        </p>
        <div className="border borer-[#D9D9D9] rounded-full p-[3px]">
          <DownloadTemplate headers={headerData} data={sampleData} />
        </div>
      </div>
      <div className="mt-6 grid sm:grid-cols-2 grid-cols-1 gap-5">
        <div>
          <div>
            <p className="text-base text-[#121417] font-medium">Lead Time</p>
            <Field name="lead_time" placeholder="14 Days" as={InputFiled} />

            <p className="text-xs text-[#637587] pt-2 px-3">
              The number of days it takes to receive stock after placing an
              order.
            </p>
          </div>
          <div className="mt-5">
            <p className="text-base text-[#121417] font-medium">
              Safety Stock (%)
            </p>
            <div className="relative ">
              <Field name="safety_stock" placeholder="20%" as={InputFiled} />
              <p className="absolute top-5 right-3">%</p>
            </div>

            <p className="text-xs text-[#637587] pt-2 px-3">
              Extra inventory kept to prevent stockouts due to demand spikes or
              supply delays.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-lg md:text-[22px] font-bold text-[#121417]">
          Upload a CSV file
        </p>

        <div
          className="h-[203px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {fileInfo ? (
            <p className="text-sm md:text-lg text-[#121417] font-bold">
              {fileInfo.name}
            </p>
          ) : (
            <p className="text-center md:text-lg text-sm text-[#121417] font-bold px-3">
              Drag and drop or click here to upload a file
            </p>
          )}

          <label
            htmlFor="fileInput"
            className="w-[110px] h-10 bg-[#F0F2F5] rounded-xl text-sm text-[#121417] font-bold cursor-pointer mt-5 flex items-center justify-center"
          >
            Choose file
            <input
              id="fileInput"
              type="file"
              accept="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <p className="text-[22px] font-bold text-[#121417]">Preview</p>

        <div className="overflow-x-auto border border-[#DBE0E5] rounded-xl mt-5">
          <div className="max-w-[300px] xl:max-w-full">
            <TableHeader />

            {isCreatingCSV ? (
              <div className="h-[300px] flex items-center justify-center">
                <Loader />
              </div>
            ) : data?.length === 0 ? (
              <p className="h-[300px] flex items-center justify-center text-black text-base text-center">
                No data uploaded yet
              </p>
            ) : (
              <div className="max-h-[440px] overflow-y-scroll">
                {data.map((item, index) => (
                  <TableRow item={item} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        type="submit"
        className={"float-right my-4 cursor-pointer hover:opacity-90"}
      >
        {isloading ? <Loader /> : "Generate"}
      </Button>
    </>
  );
}
