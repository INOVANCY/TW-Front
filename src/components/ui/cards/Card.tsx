export default function TWCard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="bg-white shadow-md rounded-lg p-4">{children}</div>;
}
