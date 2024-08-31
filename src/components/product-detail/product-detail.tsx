"use client";
import { useState } from "react";
import MaxWidthWrapper from "../max-width-wrapper";

import { Check } from "lucide-react";
import AddtoCartButton from "../buttons/add-to-cart-button";
import BuyNowButton from "../buttons/buy-now-button";
import AddtoWishlistIcon from "../buttons/wishlist-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { Product } from "~/common/model/product.model";
import { ProductImageSlider } from "./product-image-slider";
import { ProductDetailPlaceholder } from "../skeleton/product-detail-skeleton";
import { QuantitySelector } from "./quantity-selector";
import { SizeSelector } from "./size-selector";
import { QuantityExceededWarning } from "./quantity-exceeded-warning";

export interface ProductDetailError {
  quantityError: boolean | null;
  sizeError: boolean;
  showDialogWarning: boolean;
}

const ProductDetail = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [availableQuantity, setAvailableQuantity] = useState<number>(0);
  const [errors, setErrors] = useState<ProductDetailError>({
    quantityError: null,
    sizeError: false,
    showDialogWarning: false,
  });

  return (
    <MaxWidthWrapper>
      <QuantityExceededWarning
        open={errors.showDialogWarning}
        setOpen={(isShow) =>
          setErrors((prev) => ({ ...prev, showDialogWarning: isShow }))
        }
      />
      {product ? (
        <div className="bg-white flex gap-4 p-10 rounded-sm">
          <div className="w-full grid grid-cols-10 gap-2">
            <div className="col-span-8 aspect-square relative">
              <ProductImageSlider images={product.images} />
            </div>
          </div>
          <div className="w-full flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
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
              sizes={product.sizeQuantity}
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
              sizeQuantity={product.sizeQuantity}
              selectedSize={selectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
              availableQuantity={availableQuantity}
              setAvailableQuantity={setAvailableQuantity}
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
                <AddtoCartButton
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
                />
              </div>
              <div className="flex-1">
                <BuyNowButton
                  product={product}
                  size={selectedSize}
                  quantity={quantity}
                  setError={(error) => {
                    setErrors((prev) => ({ ...prev, sizeError: error }));
                  }}
                />
              </div>
              <AddtoWishlistIcon product={product} />
            </div>
          </div>
        </div>
      ) : (
        <ProductDetailPlaceholder />
      )}
    </MaxWidthWrapper>
  );
};

export default ProductDetail;
