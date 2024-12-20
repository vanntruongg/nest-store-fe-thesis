"use client";

import Link from "next/link";
import Image from "next/image";

import Logo from "../../../../public/assets/logo.png";
import MaxWidthWrapper from "../max-width-wrapper";
import MobileNav from "./mobile-nav";
import NavBar from "./navbar";
import Wishlist from "../wishlist";
import Cart from "./cart";
import NavUser from "./nav-user";
import Search from "./search";
import { ButtonLogin } from "./login-btn";
import { useEffect, useState } from "react";
import { useUser } from "~/hooks/useUser";

const Header = () => {
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <header className="fixed w-full bg-white top-0 lg:min-w-[1280px] p-2 backdrop-blur-lg shadow z-[50] max-h-80">
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
            {isMounted && user.email !== "" ? (
              <>
                <Cart />
                <NavUser />
              </>
            ) : (
              <ButtonLogin />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Header;
