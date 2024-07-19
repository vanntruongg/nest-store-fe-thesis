"use client";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { ROUTES } from "~/common/constants/routes";
import { useCheckout } from "~/hooks/useCheckout";

export default function CheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { clearCheckout } = useCheckout();

  useEffect(() => {
    if (pathname !== ROUTES.CHECKOUT && pathname !== ROUTES.CART) {
      clearCheckout();
    }
  }, [pathname, clearCheckout]);

  return <>{children}</>;
}
