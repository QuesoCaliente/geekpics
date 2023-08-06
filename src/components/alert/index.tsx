import React from "react";

interface IAlertProps {
  message?: string;
  type: "error" | "success" | "warning";
  showBadge?: boolean;
}

export default function Alert({ message, type, showBadge }: IAlertProps) {
  const typeStyle = {
    error: {
      bg: "bg-red-800",
      text: "text-red-100",
      icon: "bg-red-500",
    },
    success: {
      bg: "bg-green-800",
      text: "text-green-100",
      icon: "bg-green-500",
    },
    warning: {
      bg: "bg-yellow-800",
      text: "text-yellow-100",
      icon: "bg-yellow-500",
    },
  };

  return (
    <div
      className={`"p-2 ${typeStyle[type].bg} items-center ${typeStyle[type].text} leading-none lg:rounded-full flex lg:inline-flex"`}
      role="alert"
    >
      {showBadge && (
        <span
          className={`flex rounded-full ${typeStyle[type].icon} uppercase px-2 py-1 text-xs font-bold`}
        >
          {type === "error"
            ? "Error"
            : type === "success"
            ? "Success"
            : "Warning"}
        </span>
      )}
      <span className="font-semibold px-2 py-1 text-center flex-auto">
        {message && message}
      </span>
    </div>
  );
}
