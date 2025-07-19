import React, { useState, useCallback } from "react";
import { CSVLink } from "react-csv";
import { IconButton, Tooltip, Button, Icon } from "@mui/material";
import { Download } from "lucide-react";
const DownloadTemplate = ({ data, headers }) => {
  return (
    <CSVLink data={data} headers={headers} filename={"template.csv"}>
      <Button
        variant="outlined"
        color="#000"
        className="flex items-center justify-center rounded-md px-4 py-2 hover:shadow-lg"
      >
        Download Sample
        <Icon
          type="icon"
          form={"genratemanyform"}
          className="rounded-md ml-2 text-xs"
          style={{ color: "#000" }}
        >
          <Download size={20} />
        </Icon>
      </Button>
    </CSVLink>
  );
};

export default DownloadTemplate;
