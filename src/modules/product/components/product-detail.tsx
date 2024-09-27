"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { Check } from "lucide-react";

import MaxWidthWrapper from "../../../common/components/max-width-wrapper";
import AddtoWishlistIcon from "../../../common/components/buttons/wishlist-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { ProductImageGallery } from "./product-image-gallery";
import { QuantitySelector } from "./quantity-selector";
import { SizeSelector } from "./size-selector";
import { QuantityExceededWarning } from "./quantity-exceeded-warning";
import { DetailHeader } from "./detail-header";
import { SizeQuantity } from "../models/SizeQuantity";
import { Product } from "../models/Product";
import { getStockByProductId } from "../services/InventoryService";
import { CartPost } from "~/modules/cart/model/CartRequest";
import { addToCart } from "~/modules/cart/services/CartService";
import { toast } from "~/components/ui/use-toast";
import { ToastAction } from "~/components/ui/toast";
import { ROUTES } from "~/common/constants/routes";
import { Button } from "~/components/ui/button";
import { BaseUtil } from "~/common/utility/base.util";
import { useCart } from "~/hooks/useCart";
import { ItemCheckout } from "~/app/(guest)/cart/page";
import { useCheckout } from "~/hooks/useCheckout";

export interface ProductDetailError {
  quantityError: boolean | null;
  sizeError: boolean;
  showDialogWarning: boolean;
}

interface Props {
  product: Product;
  averageStar: number;
  totalRating: number;
}

const ProductDetail = ({ product, averageStar, totalRating }: Props) => {
  const { addItem } = useCheckout();
  const { setCartLength } = useCart();
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  const [errors, setErrors] = useState<ProductDetailError>({
    quantityError: null,
    sizeError: false,
    showDialogWarning: false,
  });
  const [sizeQuantity, setSizeQuantity] = useState<SizeQuantity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStockByProductId(product.id);
      setSizeQuantity(res.data);
    };
    fetchData();
  }, [product]);

  const handleAddToCartOrBuyNow = async (action: "add" | "buy") => {
    if (selectedSize === undefined) {
      setErrors((prev) => ({ ...prev, sizeError: true }));
      return;
    }
    const payload: CartPost = {
      productId: product.id,
      size: selectedSize,
      quantity: quantity,
    };
    try {
      const res = await addToCart(payload);
      if (res.success) {
        toast({
          description: res.message,
          action: (
            <ToastAction altText="Xem giỏ hàng">
              <Link href={ROUTES.CART}>Xem giỏ hàng</Link>
            </ToastAction>
          ),
        });
      }
      if (action === "buy") {
        setCartLength(res.data);
        const item: ItemCheckout = {
          productId: product.id,
          image: product.imageUrl,
          name: product.name,
          price: product.price,
          size: selectedSize,
          quantity,
        };
        addItem(item);
        router.push(ROUTES.CHECKOUT);
      }
    } catch (error: any) {
      if (error.status === 401) {
        toast({
          variant: "destructive",
          description: "Bạn cần đăng nhập trước khi mua hàng",
        });
      } else {
        BaseUtil.handleErrorApi({ error });
      }
    }
  };

  return (
    <MaxWidthWrapper>
      <QuantityExceededWarning
        open={errors.showDialogWarning}
        setOpen={(isShow) =>
          setErrors((prev) => ({ ...prev, showDialogWarning: isShow }))
        }
      />

      <div className="bg-white grid grid-cols-2 gap-4 p-5 rounded-sm">
        <ProductImageGallery imageUrl={product.imageUrl} />

        <div className="w-full flex flex-col space-y-4">
          <DetailHeader
            productName={product.name}
            averagerStar={averageStar}
            ratingCount={totalRating}
          />
          <p className="px-4 text-lg font-bold bg-gray-50 p-2">
            {ProductUtil.formatPrice(product.price)}
          </p>
          <div className="px-4 flex items-center">
            <Check
              aria-hidden="true"
              className="size-5 flex-shrink-0 text-green-500"
            />
            <p className="ml-2 text-sm text-muted-foreground">
              Miễn phí vận chuyển
            </p>
          </div>

          {/* Size */}
          <SizeSelector
            sizes={sizeQuantity}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            error={errors.sizeError}
            setError={(error) =>
              setErrors((prev) => ({ ...prev, sizeError: error }))
            }
          />

          {/* quantity */}
          <QuantitySelector
            productId={product.id}
            sizeQuantity={sizeQuantity}
            selectedSize={selectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            // availableQuantity={availableQuantity}
            // setAvailableQuantity={setAvailableQuantity}
            error={errors.quantityError}
            setError={(error) =>
              setErrors((prev) => ({ ...prev, quantityError: error }))
            }
            setShowAlertDialog={(isShow) =>
              setErrors((prev) => ({ ...prev, showDialogWarning: isShow }))
            }
          />

          {/* buttons */}
          <div className="flex gap-4">
            <div className="flex-1">
              {/* <AddtoCartButton
                product={product}
                size={selectedSize}
                quantity={quantity}
                setError={(error) =>
                  setErrors((prev) => ({ ...prev, sizeError: error }))
                }
                setShowAlertDialog={(isShow) =>
                  setErrors((prev) => ({
                    ...prev,
                    showDialogWarning: isShow,
                  }))
                }
                className="w-full bg-black text-white hover:bg-primary"
              /> */}
              <Button
                onClick={() => handleAddToCartOrBuyNow("add")}
                size={"sm"}
                disabled={quantity === 0}
                className={cn(
                  "w-full bg-black text-white hover:bg-primary hover:shadow-sm text-sm rounded-none transition-all duration-500"
                )}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
            <div className="flex-1">
              <Button
                onClick={() => handleAddToCartOrBuyNow("buy")}
                size={"sm"}
                disabled={quantity === 0}
                className="w-full bg-transparent border border-black text-black hover:bg-transparent hover:border-primary hover:text-primary text-sm rounded-none transition-all duration-300"
              >
                Mua ngay
              </Button>
            </div>
            <AddtoWishlistIcon product={product} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4">
        <h3 className="text-xl">Chi tiết sản phẩm</h3>
        <div className="py-8 flex flex-col gap-2 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground">Chất liệu:</span>
            <p>{product.material}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">Phong cách:</span>
            <p>{product.style}</p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductDetail;
