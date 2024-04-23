interface TWCardBodyProps {
  children: React.ReactNode;
}

export default function TWCardBody({ children }: TWCardBodyProps) {
  return <div className="p-4">{children}</div>;
}
