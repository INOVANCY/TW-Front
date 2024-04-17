import Image from "next/image";
import HorizontalMenu from "./HorizontalMenu";
import { IconBell, IconHome, IconSearch, IconSun } from "@tabler/icons-react";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import UserMenu from "./UserMenu";
export default function NavBar() {
  return (
    <div className="bg-white dark:bg-gray-700">
      <header className="border-b">
        <div className="mx-auto w-9/12">
          <div className="flex justify-between w-full ps-0 p-4">
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
            <div className="flex gap-5 items-center">
              <SearchBar />
              <ThemeSwitcher />
              <Notifications />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>
      <nav className="border-b">
        <div className="mx-auto w-9/12">
          <HorizontalMenu />
        </div>
      </nav>
    </div>
  );
}
