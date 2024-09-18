import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "~/static";
import { ChevronDown } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden lg:flex gap-8 items-center lg:justify-start text-sm font-bold leading-none">
      {navLinks.map((link, idx) =>
        link?.href ? (
          <div key={idx} className="relative group">
            {pathname === link.href ? (
              <div className="text-primary">{link.label}</div>
            ) : (
              <Link
                href={link.href}
                className="transition duration-100 hover:text-primary"
              >
                {link.label}
              </Link>
            )}
          </div>
        ) : (
          <div
            key={idx}
            className="flex gap-1 items-center cursor-pointer relative group hover:text-primary"
          >
            <p className="">{link.label}</p>
            <ChevronDown strokeWidth={2} size={20} />
            {link.children && (
              <div className="min-w-60 absolute top-11 p-4 flex flex-col space-y-2 bg-white text-black shadow opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200">
                {link.children.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href || "/"}
                    className="p-1 transition duration-100 hover:text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          // <MenuDropDown key={idx} itemNav={link} />
        )
      )}
      {/* <NavItems /> */}
    </nav>
  );
};

export default NavBar;
