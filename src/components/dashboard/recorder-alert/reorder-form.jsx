import Loader from "@/components/common/loader";
import InputFiled from "@/components/input-filed";
import { Button } from "@/components/ui/button";
import { useGetInventoryQuery } from "@/lib/services/auth-api";
import { Field, useFormikContext } from "formik";
import React, { useState } from "react";

export default function ReorderForm({ isloading }) {
  const [fileInfo, setFileInfo] = useState(null);
  const { values, setFieldValue } = useFormikContext();
  const handleFileChange = async (e) => {
    if (e?.target?.files && e?.target?.files?.length > 0) {
      setFileInfo(e?.target?.files[0]);
      setFieldValue("file", e?.target?.files[0]);
    }
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
      <p className="text-2xl md:text-[32px] text-[#121417] font-bold">
        Reorder Alerts
      </p>

      <div className="mt-6">
        <div>
          <p className="text-base text-[#121417] font-medium">Lead Time</p>
          <Field name="lead_time" placeholder="14 Days" as={InputFiled} />

          <p className="text-xs text-[#637587] pt-2 px-3">
            The number of days it takes to receive stock after placing an order.
          </p>
        </div>

        <div className="mt-5">
          <p className="text-base text-[#121417] font-medium">
            Safety Stock (%)
          </p>
          <Field name="safety_stock" placeholder="20%" as={InputFiled} />
          <p className="text-xs text-[#637587] pt-2 px-3">
            Extra inventory kept to prevent stockouts due to demand spikes or
            supply delays.
          </p>
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
      <Button
        type="submit"
        className={"float-right my-4 cursor-pointer hover:opacity-90"}
      >
        {isloading ? <Loader /> : "Generate"}
      </Button>
    </>
  );
}
