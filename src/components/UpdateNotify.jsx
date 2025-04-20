import React from "react";
import { Button } from "./ui/button";
import { useUpdateNotificationMutation } from "@/lib/services/alerts-api";

export default function UpdateNotify({notification}) {
  const [updateNotification, { isLoading: updateNotificationLoading }] =
    useUpdateNotificationMutation();
  return (
    <Button
      size={"sm"}
      className="text-[10px] p-1"
      onClick={async () => {
        await updateNotification({
            id: notification?._id,
            body: { isread: true },
        }).unwrap();
      }}
    >
      {updateNotificationLoading ? "Reading..." : "Read"}
    </Button>
  );
}
