import { IconLoader, IconLoader2 } from "@tabler/icons-react";

interface LoaderProps {
  size?: number;
}

export default function Loader({ size = 24 }: LoaderProps) {
  return (
    <span className="animate-spin me-2">
      <IconLoader2 size={size} />
    </span>
  );
}
