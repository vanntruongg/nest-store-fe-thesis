"use client";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { BaseUtil } from "~/common/utility/base.util";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/useCart";
import IconTextLoading from "../icon-text-loading";
import { useCheckout } from "~/hooks/useCheckout";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { ROUTES } from "~/common/constants/routes";
import { CartUtil } from "~/common/utility/cart.util";
import { ItemCheckout } from "~/app/(guest)/cart/page";
import { Product } from "~/modules/product/models/Product";
import { CartPost } from "~/modules/cart/model/CartRequest";
import { addToCart } from "~/modules/cart/services/CartService";

interface AddtoCartButtonProps {
  product: Product;
  size?: string;
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
  const { setCartLength } = useCart();
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

      const data: CartPost = {
        productId: product.id,
        size: size!,
        quantity,
      };

      const result = await addToCart(data);
      setCartLength(result.data);

      const item: ItemCheckout = {
        productId: product.id,
        image: product.imageUrl,
        name: product.name,
        price: product.price,
        size: size!,
        quantity,
      };

      addItem(item);
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
