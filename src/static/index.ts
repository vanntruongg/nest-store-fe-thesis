import { ROUTES } from "~/common/constants/routes";

export type ItemNav = {
  label: string;
  href?: string;
  children?: ItemNav[];
};

export const navLinks: ItemNav[] = [
  {
    label: "Trang chủ",
    href: ROUTES.HOME,
  },
  {
    label: "Cửa hàng",
    href: ROUTES.SHOP,
  },
  {
    label: "Liên hệ",
    href: ROUTES.CONTACT,
  },
  {
    label: "Khác",
    children: [
      {
        label: "Hướng dẫn mua hàng",
        href: ROUTES.GUIDE,
      },
      {
        label: "Giới thiệu",
        href: ROUTES.INTRODUCE,
      },
    ],
  },
];

export const statusClasses: Record<string, string> = {
  PENDING: "text-warning bg-warning",
  ACCEPTED: "text-processing bg-processing",
  SHIPPING: "text-shipping bg-shipping",
  COMPLETED: "text-success bg-success",
  CANCELED: "text-danger bg-danger",
};
