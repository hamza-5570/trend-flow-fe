import React, { useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import { IconButton, Tooltip } from "@mui/material";
import { Download } from "lucide-react";
const DownloadTemplate = ({data,headers}) => {
  return (
    <CSVLink
      data={data}
      headers={headers}
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
