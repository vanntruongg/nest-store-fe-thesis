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
  "Chờ xác nhận": "text-warning bg-warning",
  "Đang xử lý": "text-processing bg-processing",
  "Đang giao": "text-shipping bg-shipping",
  "Hoàn thành": "text-success bg-success",
  "Đã hủy": "text-danger bg-danger",
};
