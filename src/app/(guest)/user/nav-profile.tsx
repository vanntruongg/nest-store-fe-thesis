"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPinned, ShieldCheck, ShoppingBag, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "../../../components/ui/button";
import Image from "next/image";
import { useUser } from "~/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { ReactElement, useEffect, useState } from "react";
import ButtonLogout from "~/components/button/btn-logout";

interface ILinkNavUserProfile {
  href: string;
  label: string;
  icon: ReactElement;
}

const links: ILinkNavUserProfile[] = [
  {
    href: "/user/profile",
    label: "Tài khoản",
    icon: <User size={20} />,
  },
  {
    href: "/user/purchase",
    label: "Đơn mua",
    icon: <ShoppingBag size={20} />,
  },
  {
    href: "/user/address",
    label: "Địa chỉ",
    icon: <MapPinned size={20} />,
  },
  {
    href: "/user/password",
    label: "Mật khẩu",
    icon: <ShieldCheck size={20} />,
  },
];

const NavLinkUser = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="bg-white rounded-sm p-4 flex flex-col items-center h-full">
      <div className="bg-white rounded-sm -translate-y-14">
        <Avatar className="rounded-md size-20">
          <AvatarImage
            src={user.imageUrl}
            alt="avatar user"
            className="size-full rounded-md"
          />
          <AvatarFallback className="size-full bg-white rounded-md">
            AVT
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="-translate-y-8">
        <h3 className="text-2xl text-muted-foreground">
          {isMounted && `${user.lastName} ${user.firstName}`}
        </h3>
      </div>
      <div className="flex flex-col gap-4 text-xs font-semibold uppercase">
        {links.map(({ href, label, icon }) =>
          pathname === href ? (
            <div
              key={href}
              className="px-4 py-2 flex items-center gap-2 rounded-sm bg-primary text-white"
            >
              <span className="-mt-0.5"> {icon}</span>
              <p>{label}</p>
            </div>
          ) : (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 flex items-center gap-2 rounded-sm text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200"
            >
              <span className=" -mt-0.5"> {icon}</span>
              <p className="">{label}</p>
            </Link>
          )
        )}

        <ButtonLogout className="px-4 py-2 text-gray-500 border rounded-sm hover:text-gray-900 hover:bg-gray-100 transition-all duration-200" />
      </div>
    </div>
  );
};

export default NavLinkUser;
