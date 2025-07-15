import React, { useState } from "react";
import TableHeader from "./table/table-header";
import TableRow from "./table/table-row";
import * as XLSX from "xlsx";
import {
  useCreateProductMutation,
  usePostSalesMutation,
} from "@/lib/services/product-api";
import Loader from "@/components/common/loader";
import { toast } from "sonner";
import sampleData from "../../../data/sample-data.json";
import DownloadTemplate from "@/components/download-template";
import { Button } from "@/components/ui/button";
const headerData = [
  { label: "SKU", key: "SKU" },
  { label: "ProductId", key: "Productid" },
  { label: "OrderId", key: "OrderId" },
  { label: "UnitsSold", key: "UnitsSold" },
  { label: "Sales", key: "Sales" },
  { label: "SaleDate", key: "SaleDate" },
  { label: "CurrentInventory", key: "CurrentInventory" },
  { label: "ReorderPoint", key: "ReorderPoint" },
  { label: "Size", key: "Size" },
  { label: "Color", key: "Color" },
  { label: "ProductTitle", key: "ProductTitle" },
  { label: "Category", key: "Category" },
  { label: "Subcategory", key: "Subcategory" },
  { label: "Material", key: "Material" },
  { label: "Gender_Age", key: "Gender_Age" },
  { label: "Price", key: "Price" },
];
export default function UpdateSalesData() {
  const [fileInfo, setFileInfo] = useState(null);
  const [data, setData] = useState([]);
  const [files, setFiles] = useState(null);

  const [creatingCSV, { isLoading: isCreatingCSV }] =
    useCreateProductMutation();

  const [updateSales, { isLoading }] = usePostSalesMutation();

  const handleFileUpload = async (file) => {
    setFiles(file);
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop() || "";
    setFileInfo({ name: fileName, extension: fileExtension });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
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
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-2xl md:text-[32px] text-[#121417] font-bold">
          Upload Sales Data
        </p>
        <Button variant={"outline"}>
          <p className="text-sm text-[#121417] font-medium">Download Sample</p>
          <DownloadTemplate headers={headerData} data={sampleData} />
        </Button>
      </div>
      <p className="text-sm text-[#637587] pt-2">Step 1 of 2</p>

      <p className="xl:w-[980px] text-sm md:text-base text-[#121417] pt-3">
        Quickly improve your forecast by uploading historical sales data. This
        should be a CSV file containing at least the following columns: Unit
        sold column, sku, and dates, as well as additional information such as
        product title. More columns with information the better.
      </p>

      <div className="mt-6">
        <p className="text-lg md:text-[22px] font-bold text-[#121417]">
          Upload a CSV file
        </p>

        <div
          className="h-[203px] flex flex-col items-center justify-center border-2 border-dashed border-[#DBE0E5] rounded-xl mt-5"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {fileInfo ? (
            <p className="md:text-lg text-[#121417] font-bold">
              {fileInfo.name}
            </p>
          ) : (
            <p className="text-sm md:text-lg text-center text-[#121417] font-bold">
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
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
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

        <div className="flex items-center justify-between mt-5">
          <button
            onClick={async () => {
              const formData = new FormData();
              formData.append("file", files);

              try {
                await updateSales(formData)
                  .unwrap()
                  .then((res) => {
                    toast.success(res?.message);
                  });
              } catch (error) {
                console.error("Error uploading file:", error);
              }
            }}
            className="w-[110px] h-10 ml-auto bg-[#F0F2F5] rounded-xl text-sm text-[#121417] font-bold cursor-pointer flex items-center justify-center"
          >
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}
