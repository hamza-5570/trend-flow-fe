import React from "react";
import LowStockItems from "./lowStockItems";
import ReorderInvertory from "./reorder-Invertory";
import AlertReminder from "@/components/common/alert";

export default function RecorderAlerts() {
  return (
    <>
      <AlertReminder
        title="Remember: Check This Before Moving Forward."
        description="You only need to add data on the Reorder Alerts page if sales data is insufficient."
      />
      <ReorderInvertory />
      <LowStockItems />
    </>
  );
}
