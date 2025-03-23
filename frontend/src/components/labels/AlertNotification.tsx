import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";

interface Props {
  message: {
    type: string;
    text: string;
  };
}

function AlertNotification({ message }: Props) {
  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-md my-2 ${
        message.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {message.type === "success" ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      <p className="text-sm">{message.text}</p>
    </div>
  );
}

export default AlertNotification;
