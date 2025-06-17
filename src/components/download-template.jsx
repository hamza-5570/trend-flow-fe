import React, { useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import sampleData from "../data/sample-data.json";
import { IconButton, Tooltip } from "@mui/material";
import { Download } from "lucide-react";
const DownloadTemplate = () => {
  return (
    <CSVLink
      data={sampleData}
      headers={[
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
      ]}
    >
      {/* <Button
        type="button"
        size="xs"
        form={"genratemanyform"}
        className="w-40 absolute top-12 -left-32 bg-white border rounded-md text-xs px-4 py-2 cursor-pointer hover:bg-[#5f2eea] hover:text-white"
      >
        Download CSV
      </Button> */}
      <Tooltip title="Download Sample Data">
        <IconButton
          type="button"
          form={"genratemanyform"}
          className="border-2 border-[#D9D9D9]"
        >
          <Download color="#000" />
        </IconButton>
      </Tooltip>
    </CSVLink>
  );
};

export default DownloadTemplate;
