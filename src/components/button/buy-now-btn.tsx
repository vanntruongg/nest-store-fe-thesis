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

interface AddtoCartButtonProps {
  product: Product;
  quantity: number;
}

const BuyNowButton = ({ product, quantity }: AddtoCartButtonProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { addToCart } = useCart();
  const { addItem } = useCheckout();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleAddtoCartAndCheckout = async () => {
    setLoading(true);
    if (tokenStorage.value.rawToken.accessToken === "") {
      router.push("/login");
      return;
    }

    try {
      if (!ProductUtil.validateStock(product.stock, quantity)) {
        return;
      }

      const item: Item = {
        productId: product.id,
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
        image: product.imageUrl,
        quantity,
      });
      addToCart(item);
      router.push("/checkout");
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
