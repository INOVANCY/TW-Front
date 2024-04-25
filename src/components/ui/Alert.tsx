import { TWAlertProps } from "@/types/ui";
import {
  IconCheck,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconInfoCircle,
  IconInfoSmall,
} from "@tabler/icons-react";

export default function TWAlert({ type, size, message }: TWAlertProps) {
  const colors = {
    success: "bg-green-100 text-green-600 border border-green-200 ",
    info: "bg-blue-100 text-blue-600 border border-blue-200",
    warning: "bg-yellow-200 text-yellow-600 border border-yellow-200",
    error: "bg-red-100 text-red-600 border border-red-200",
  };

  const icons = {
    success: {
      color: "bg-green-600",
      icon: <IconCircleCheck />,
    },
    info: { color: "bg-blue-600", icon: <IconInfoCircle /> },
    warning: {
      color: "bg-yellow-600",
      icon: <IconExclamationCircle />,
    },
    error: { color: "bg-red-600", icon: <IconCircleX /> },
  };

  return (
    <div
      className={`p-3 rounded-lg flex items-center gap-2 ${colors[type]} text-${size}`}
    >
      <span className={`p-1 text-white rounded-lg ${icons[type].color}`}>
        {icons[type].icon}
      </span>
      <span>{message}</span>
    </div>
  );
}
