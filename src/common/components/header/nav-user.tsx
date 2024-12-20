import React, { useEffect, useState } from "react";
import { UserRound, ShoppingCart, Sun, AreaChart } from "lucide-react";
import Link from "next/link";
import { useOutsideClick } from "~/hooks/useOutsideClick";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
import { useUser } from "~/hooks/useUser";
import { ROUTES } from "~/common/constants/routes";
import DevelopingTooltip from "../developing-tooltip";
import ButtonLogout from "../buttons/logout-button";
import { UserAvatar } from "~/modules/user/components/user-avatar";
import { UserRole } from "~/common/utility/enum.util";
import { BaseUtil } from "~/common/utility/base.util";

const menu = [
  {
    icon: <UserRound className="size-5" />,
    label: "Tài khoản",
    href: ROUTES.USER.PROFILE,
    status: "available",
  },
  {
    icon: <ShoppingCart className="size-5" />,
    label: "Đơn hàng",
    href: ROUTES.USER.PURCHASE,
    status: "available",
  },
  {
    icon: <Sun className="size-5" />,
    label: "Chế độ tối",
    href: "",
    status: "notAvailable",
  },
];

const NavUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const pathname = usePathname();
  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div ref={ref} className="relative">
      <div className="p-2">
        <UserAvatar
          imageUrl={user.imageUrl}
          firstName={user.firstName}
          onClick={() => setOpen(!open)}
        />
        <div
          className={cn(
            "min-w-60 p-2 bg-white border border-gray-300 rounded-2xl shadow-md absolute top-12 right-0 z-50 transition-all duration-300 invisible origin-top-right transform scale-0 opacity-0 group-hover:visible",
            {
              "visible scale-100 opacity-100": open,
            }
          )}
        >
          <Link
            href={ROUTES.USER.PROFILE}
            className="p-2 flex justify-center items-center gap-4 border-b hover:opacity-80"
          >
            {/* <Avatar>
              <AvatarImage src={user.imageUrl} alt="avatar user" />
              <AvatarFallback className="bg-gradient-to-br from-purple-800 to-pink-400 text-white">
                {BaseUtil.generateDefaultAvatarInitial(user.firstName)}
              </AvatarFallback>
            </Avatar> */}
            {isMounted && (
              <p className="font-semibold">{`${user.lastName} ${user.firstName}`}</p>
            )}
          </Link>
          <div className="p-2">
            {user.roles.find((role) => role.name === UserRole.ADMIN) && (
              <Link
                key={ROUTES.ADMIN.STATISTIC}
                href={ROUTES.ADMIN.STATISTIC}
                className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md"
              >
                <AreaChart />
                <p>Trang quản trị</p>
              </Link>
            )}
            {menu.map((item) =>
              item.status === "available" ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md"
                >
                  {item.icon}
                  <p>{item.label}</p>
                </Link>
              ) : (
                <DevelopingTooltip
                  key={item.href}
                  className={
                    "p-2 w-full flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md opacity-50"
                  }
                >
                  {item.icon}
                  <p>{item.label}</p>
                </DevelopingTooltip>
              )
            )}
            <ButtonLogout className="p-2 flex gap-4 items-center text-sm text-gray-500 hover:bg-gray-100 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavUser;
