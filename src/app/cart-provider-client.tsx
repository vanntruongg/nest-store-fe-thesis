"use client";
import { ReactNode, useEffect } from "react";
import cartApi from "~/apis/cart-api";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { BaseUtil } from "~/common/utility/base.util";
import { useCart } from "~/hooks/useCart";
import { useUser } from "~/hooks/useUser";

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
        const result = await cartApi.countItems();
        setCartLength(result.payload.data);
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    };
    if (tokenStorage.value.rawToken.accessToken) {
      fetchData();
    } else {
      setCartLength(0);
    }
  }, [tokenStorage.value.rawToken.accessToken]);
  return <>{children}</>;
}
