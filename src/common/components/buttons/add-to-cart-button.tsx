"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { BaseUtil } from "~/common/utility/base.util";
import { useRouter } from "next/navigation";
import { useCart } from "~/hooks/useCart";
import { ToastAction } from "../../../components/ui/toast";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { ROUTES } from "~/common/constants/routes";
import { AuthUtil } from "~/common/utility/auth.util";
import { CartUtil } from "~/common/utility/cart.util";
import { addToCart } from "~/modules/cart/services/CartService";
import { Product } from "~/modules/product/models/Product";
import { toast } from "~/components/ui/use-toast";
import { CartPost } from "~/modules/cart/model/CartRequest";

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

      const data: CartPost = {
        productId: product.id,
        size: size!,
        quantity,
      };

      const result = await addToCart(data);

      if (result.success) {
        setCartLength(result.data);
        toast({
          description: result.message,
          action: (
            <ToastAction altText="Xem giỏ hàng">
              <Link href={ROUTES.CART}>Xem giỏ hàng</Link>
            </ToastAction>
          ),
        });
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
