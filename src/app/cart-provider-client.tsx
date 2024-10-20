"use client";
import { ReactNode, useEffect } from "react";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { BaseUtil } from "~/common/utility/base.util";
import { useCart } from "~/hooks/useCart";
import { cartCountItems } from "~/modules/cart/services/CartService";

interface CartProviderClientProps {
  children: ReactNode;
}

export default function CartProviderClient({
  children,
}: CartProviderClientProps) {
  const { setCartLength } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await cartCountItems();
        setCartLength(result.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    const accessToken = tokenStorage.value.rawToken.accessToken;
    if (accessToken) {
      fetchData();
    } else {
      setCartLength(0);
    }
  }, [setCartLength]);
  return <>{children}</>;
}
