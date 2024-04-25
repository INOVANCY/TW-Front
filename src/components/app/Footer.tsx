"use client";

import { IconHeart } from "@tabler/icons-react";
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
    <div className="mx-auto w-9/12">
      <div className="flex items-center justify-between mb-3">
        <p className="flex gap-1 items-center text-slate-800">
          © 2024 Fait avec <IconHeart size={18} className="text-red-600" /> par
          <a
            href="https://inovancy.dev"
            className="hover:underline underline-offset-2"
          >
            INOVANCY
          </a>
        </p>
        <div className="flex items-center gap-4">
          <a
            href=""
            className="text-slate-800 hover:underline underline-offset-2"
          >
            Politique de confidentialité
          </a>
          <a
            href=""
            className="text-slate-800 hover:underline underline-offset-2"
          >
            Conditions d'utilisation
          </a>
        </div>
      </div>
    </div>
  );
}
