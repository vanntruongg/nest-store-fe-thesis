import Link from "next/link";
import Image from "next/image";

import NavBar from "./navbar";
import Search from "../app/(guest)/search/search";
import Logo from "../../public/assets/logo.png";
import NavUser from "./nav-user";
import MaxWidthWrapper from "./max-width-wrapper";
import MobileNav from "./mobile-nav";
import Wishlist from "./wishlist";
import Cart from "./cart";

const Header = () => {
  return (
    <header className="fixed w-full bg-white top-0 lg:min-w-[1280px] p-2 backdrop-blur-lg shadow z-30 max-h-80">
      <MaxWidthWrapper>
        <div className="flex justify-between items-center lg:grid grid-cols-10">
          <div className="flex items-center gap-4 col-span-1 justify-start overflow-hidden">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <Link href="/" className="">
              <Image src={Logo} alt="logo shop" width={80} priority />
            </Link>
          </div>
          <div className="col-span-4">
            <NavBar />
          </div>
          <div className="flex justify-end items-center gap-2 col-span-5">
            <Search />
            <Wishlist />
            <Cart />
            <NavUser />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
