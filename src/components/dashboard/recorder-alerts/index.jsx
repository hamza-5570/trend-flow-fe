import React from "react";
import LowStockItems from "./lowStockItems";
import ReorderInvertory from "./reorder-Invertory";

export default function RecorderAlerts() {
  return (
    <>
      <ReorderInvertory />
      <LowStockItems />
    </>
  );
}
