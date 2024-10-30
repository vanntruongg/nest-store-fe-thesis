"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/nest-logo-tranparent.png";
import {
  LiaClipboardListSolid,
  LiaUserFriendsSolid,
  LiaChartBarSolid,
  LiaChartLineSolid,
  LiaBoxesSolid,
} from "react-icons/lia";
import { usePathname } from "next/navigation";
import ButtonLogout from "~/common/components/buttons/logout-button";
import { ROUTES } from "~/common/constants/routes";
import { useUser } from "~/hooks/useUser";
import { UserRole } from "~/common/utility/enum.util";
import { AuthUtil } from "~/common/utility/auth.util";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

const menuDashboardItems = [
  {
    id: 1,
    icon: <LiaChartBarSolid size={20} />,
    label: "Thống kê",
    link: ROUTES.ADMIN.STATISTIC,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    id: 2,
    icon: <LiaChartLineSolid size={20} />,
    label: "Dự báo thông minh",
    link: ROUTES.ADMIN.AI_PREDICT,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    id: 3,
    icon: <LiaUserFriendsSolid size={20} />,
    label: "Quản lý người dùng",
    link: ROUTES.ADMIN.USER,
    roles: [UserRole.ADMIN],
  },
  {
    id: 4,
    icon: <LiaClipboardListSolid size={20} />,

    label: "Quản lý đơn hàng",
    link: ROUTES.ADMIN.ORDER,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    id: 5,
    icon: <LiaBoxesSolid size={20} />,
    label: "Quản lý sản phẩm",
    link: ROUTES.ADMIN.PRODUCT,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
  {
    id: 6,
    icon: <LiaBoxesSolid size={20} />,
    label: "Quản lý danh mục",
    link: ROUTES.ADMIN.CATEGORY,
    roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
  },
];

export function NavAdmin() {
  const { user: currentUser } = useUser();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const userRoles = AuthUtil.getUserRoles(currentUser);

  const rendermenuDashboardItems = menuDashboardItems
    .filter((item) => item.roles.some((role) => userRoles.includes(role)))
    .map((item) =>
      pathname === item.link ? (
        <div
          key={item.id}
          className="px-4 py-2 flex items-center gap-2 rounded-full text-primary bg-gray-100"
        >
          {item.icon}
          <div>{item.label}</div>
        </div>
      ) : (
        <Link
          key={item.id}
          href={item.link}
          className={cn(
            "px-4 py-2 flex items-center gap-2 rounded-full hover:bg-gray-200 transition-all duration-200",
            {
              "text-primary": pathname.includes(item.link),
            }
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      )
    );

  return (
    <nav className="bg-gray-100 h-full min-h-screen p-4 flex flex-col justify-between shadow overflow-hidden">
      <div>
        <Link
          href={ROUTES.ADMIN.STATISTIC}
          className="overflow-hidden flex justify-center scale-150"
        >
          <Image
            src={Logo}
            alt="Logo"
            width={50}
            height={50}
            className="scale-150 overflow-hidden"
          />
        </Link>
        <div className="flex flex-col space-y-4 mt-4 text-muted-foreground text-sm font-bold">
          {/* {menuDashboardItems.map(({ id, icon, label, link }) =>
            pathname === link ? (
              <div
                key={id}
                className="px-4 py-2 flex items-center gap-2 rounded-full text-primary bg-gray-100"
              >
                {icon}
                <div>{label}</div>
              </div>
            ) : (
              <Link
                key={id}
                href={link}
                className="px-4 py-2 flex items-center gap-2 rounded-full hover:bg-gray-200 transition-all duration-200"
              >
                {icon}
                {label}
              </Link>
            )
          )} */}
          {isMounted && rendermenuDashboardItems}
        </div>
      </div>
      <div className="bottom-4 flex flex-col justify-between w-full space-y-2 text-sm font-semibold">
        {/* <Link
          href={"/"}
          className="px-2 py-4 flex justify-center items-center space-x-2 cursor-pointer text-white hover:text-primary hover:bg-white rounded-full duration-200"
        >
          <Home strokeWidth={2.5} className="size-5" />
          <p>Cửa hàng</p>
        </Link> */}
        <ButtonLogout className="px-2 py-4 flex justify-center space-x-2 bg-gray-300 text-gray-700 hover:text-primary hover:bg-gray-200 rounded-full duration-200" />
      </div>
    </nav>
  );
}
