"use client";

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <></>;
  }

  return (
    <div className="mx-auto w-11/12 md:w-9/12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
        <p className="flex gap-1 items-center">
          © 2024 Fait avec{" "}
          <span className="text-primary animate-pulse">
            <IconHeartFilled size={18} />
          </span>{" "}
          par
          <a
            href="https://inovancy.dev"
            className="hover:underline underline-offset-2"
            target="_blank"
          >
            INOVANCY
          </a>
        </p>
        <div className="flex items-center flex-wrap gap-x-4">
          <Link
            href="/privacy-policy"
            className=" hover:underline underline-offset-2"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="/terms-of-use"
            className=" hover:underline underline-offset-2"
          >
            Conditions d'utilisation
          </Link>
        </div>
      </div>
    </div>
  );
}
