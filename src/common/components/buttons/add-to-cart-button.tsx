"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import { useUser } from "~/hooks/useUser";
import { Product } from "~/common/model/product.model";
import cartApi from "~/apis/cart-api";
import { CartRequest } from "~/common/model/cart.model";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/useCart";
import { ToastAction } from "../ui/toast";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { ROUTES } from "~/common/constants/routes";
import { AuthUtil } from "~/common/utility/auth.util";
import { Toast } from "../toast/toast";
import { CartUtil } from "~/common/utility/cart.util";

interface AddtoCartButtonProps {
  product: Product;
  size?: string;
  quantity: number;
  className?: string;
  setError: (error: boolean) => void;
  setShowAlertDialog: (error: boolean) => void;
  disable?: boolean;
}

const AddtoCartButton = ({
  product,
  size,
  quantity,
  className,
  setError,
  disable,
}: AddtoCartButtonProps) => {
  const router = useRouter();
  const { setCartLength } = useCart();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddtoCart = async () => {
    setLoading(true);
    if (!AuthUtil.isLogin()) {
      router.push(ROUTES.AUTH.LOGIN);
      return;
    }

    try {
      if (!CartUtil.validateSize(size, setError)) {
        return;
      }

      const data: CartRequest = {
        productId: product.id,
        size: size!,
        quantity,
      };

      const result = await cartApi.add(data);

      if (result.payload.success) {
        setCartLength(result.payload.data);
        Toast.success(
          result.payload.message,
          <ToastAction altText="Xem giỏ hàng">
            <Link href={ROUTES.CART}>Xem giỏ hàng</Link>
          </ToastAction>
        );
      }
    } catch (error: any) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAddtoCart}
      size={"sm"}
      disabled={quantity === 0 || disable}
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
