import Image from "next/image";
import logo from "../../../public/hamburguer-logo.jpg";
import NavList from "./navList";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-[#125C13] shadow">
      <div className="mx-auto max-w-7xl px-2 py-2 sm:px-4 lg:px-5 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold tracking-tight text-white cursor-pointer flex items-center gap-1">
            <Image
              src={logo}
              width={40}
              height={40}
              alt="Logo Hamburguer"
              className="rounded-full"
            />
            fastfood
          </h1>
        </Link>

        <NavList />
      </div>
    </header>
  );
};

export default Header;
