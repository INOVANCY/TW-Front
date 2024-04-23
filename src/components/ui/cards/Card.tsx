interface TWCardProps {
  children: React.ReactNode;
}

export default function TWCard({ children }: TWCardProps) {
  return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
}
