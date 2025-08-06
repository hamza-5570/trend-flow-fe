import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, X } from "lucide-react";

export default function AlertReminder({ title = "", description = "" }) {
  const [IsShowAlert, setIsShowAlert] = useState(true);

  return (
    IsShowAlert && (
      <Alert
        className="mb-5 shadow-lg relative  border-blue-500"
        title="Success Alert"
      >
        <AlertCircleIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
        <X
          onClick={() => setIsShowAlert(false)}
          title="Close"
          className="absolute top-2 right-2 border rounded-full border-black hover:bg-black hover:text-white cursor-pointer"
        />
      </Alert>
    )
  );
}
