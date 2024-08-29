"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Product } from "~/common/model/product.model";
import { BaseUtil } from "~/common/utility/base.util";
import { useRouter } from "next/navigation";
import { CartRequest, Item } from "~/common/model/cart.model";
import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { useCart } from "~/hooks/useCart";
import IconTextLoading from "../icon-text-loading";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { ROUTES } from "~/common/constants/routes";
import { Size } from "~/common/model/inventory.model";
import { CartUtil } from "~/common/utility/cart.util";

interface AddtoCartButtonProps {
  product: Product;
  size?: Size;
  quantity: number;
  setError: (error: boolean) => void;
}

const BuyNowButton = ({
  product,
  size,
  quantity,
  setError,
}: AddtoCartButtonProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { addToCart } = useCart();
  const { addItem } = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleAddtoCartAndCheckout = async () => {
    setLoading(true);
    if (tokenStorage.value.rawToken.accessToken === "") {
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    try {
      if (!CartUtil.validateSize(size, setError)) {
        return;
      }

      const item: Item = {
        productId: product.id,
        size: size!,
        quantity,
      };
      const data: CartRequest = {
        email: user.email,
        itemDto: item,
      };

      await cartApi.add(data);

      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0].imageUrl,
        quantity,
        size: size!,
      });
      addToCart(item);
      router.push(ROUTES.CHECKOUT);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleAddtoCartAndCheckout}
      size={"sm"}
      disabled={quantity === 0}
      className="w-full bg-transparent border border-black text-black hover:bg-transparent hover:border-primary hover:text-primary text-sm rounded-none transition-all duration-300"
    >
      {loading ? (
        <IconTextLoading />
      ) : (
        <div className="flex items-center gap-1">Mua ngay</div>
      )}
    </Button>
  );
};

export default BuyNowButton;
