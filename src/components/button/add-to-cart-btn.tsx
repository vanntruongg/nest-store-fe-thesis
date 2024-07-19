"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import { useUser } from "~/hooks/useUser";
import { Product } from "~/common/model/product.model";
import cartApi from "~/apis/cart-api";
import { CartRequest, Item } from "~/common/model/cart.model";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/useCart";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { ProductUtil } from "~/common/utility/product.util";
import { cn } from "~/lib/utils";
import { tokenStorage } from "~/common/utility/auth/token-storage";
import { ROUTES } from "~/common/constants/routes";

interface AddtoCartButtonProps {
  product: Product;
  quantity: number;
  className?: string;
}

const AddtoCartButton = ({
  product,
  quantity,
  className,
}: AddtoCartButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const { addToCart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddtoCart = async () => {
    setLoading(true);
    if (tokenStorage.value.rawToken.accessToken === "") {
      router.push(ROUTES.AUTH.LOGIN);
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

      addToCart(item);

      toast({
        title: "Thành công",
        description: "Thêm vào giỏ hàng thành công",
        action: (
          <ToastAction altText="Xem giỏ hàng">
            <Link href={"/cart"}>Xem giỏ hàng</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddtoCart}
      size={"sm"}
      className={cn(
        "hover:shadow-sm text-sm rounded-none transition-all duration-500",
        className
      )}
    >
      {loading ? (
        <Loader2 strokeWidth={2} className="animate-spin w-full" />
      ) : (
        <div className="flex items-center gap-1 font-semibold">
          <ShoppingCart strokeWidth={2} className="size-5" />
          Thêm vào giỏ hàng
        </div>
      )}
    </Button>
  );
};

export default AddtoCartButton;
