import Image from "next/image";
import HorizontalMenu from "./HorizontalMenu";
import { IconBell, IconHome, IconSearch, IconSun } from "@tabler/icons-react";
import ThemeSwitcher from "./ThemeSwitcher";
import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import UserMenu from "./UserMenu";
import Logo from "./Logo";
export default function NavBar() {
  return (
    <div className="bg-card shadow-md">
      <header className="border-b">
        <div className="mx-auto w-11/12 2xl:w-9/12">
          <div className="flex justify-between w-full ps-0 p-4">
            <Logo />
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
        <div className="mx-auto w-11/12 2xl:w-9/12">
          <HorizontalMenu />
        </div>
      </nav>
    </div>
  );
}
