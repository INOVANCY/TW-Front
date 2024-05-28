import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex gap-3 items-center">
      <Image
        src="/logomark.svg"
        height={48}
        width={48}
        alt="Thrills World Logomark"
      />
      <h1 className="font-cagr text-4xl font-extrabold uppercase mt-1">
        Thrills
      </h1>
    </div>
  );
}
