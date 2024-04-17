import { IconHeart } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className="mx-auto w-9/12">
      <p className="flex items-center justify-between mb-3">
        <p className="flex gap-1 items-center text-slate-800">
          © 2024 Fait avec <IconHeart size={18} className="text-red-600" /> par
          <a
            href="https://inovancy.dev"
            className="hover:underline underline-offset-2"
          >
            INOVANCY
          </a>
        </p>
        <div className="flex items-center gap-2">
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
      </p>
    </div>
  );
}
