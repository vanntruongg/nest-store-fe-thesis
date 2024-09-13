"use client";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "../../../common/components/max-width-wrapper";

import { Check } from "lucide-react";
import AddtoCartButton from "../../../common/components/buttons/add-to-cart-button";
import BuyNowButton from "../../../common/components/buttons/buy-now-button";
import AddtoWishlistIcon from "../../../common/components/buttons/wishlist-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { Product } from "~/common/model/product.model";
import { ProductImageGallery } from "./product-image-gallery";
import { QuantitySelector } from "./quantity-selector";
import { SizeSelector } from "./size-selector";
import { QuantityExceededWarning } from "./quantity-exceeded-warning";
import inventoryApi from "~/apis/inventory-api";
import { SizeWithQuantity } from "~/common/model/common.model";
import { DetailHeader } from "./detail-header";

export interface ProductDetailError {
  quantityError: boolean | null;
  sizeError: boolean;
  showDialogWarning: boolean;
}

interface props {
  product: Product;
  averageStar: number;
  totalRating: number;
}

const ProductDetail = ({ product, averageStar, totalRating }: props) => {
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
  const [sizeQuantity, setSizeQuantity] = useState<SizeWithQuantity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await inventoryApi.getByProductId(product.id);
      setSizeQuantity(res.payload.data);
    };
    fetchData();
  }, [product]);

  return (
    <MaxWidthWrapper>
      <QuantityExceededWarning
        open={errors.showDialogWarning}
        setOpen={(isShow) =>
          setErrors((prev) => ({ ...prev, showDialogWarning: isShow }))
        }
      />

      <div className="bg-white flex gap-4 p-5 rounded-sm">
        <div className="w-full grid grid-cols-10 gap-2">
          <div className="col-span-8 aspect-square relative">
            <ProductImageGallery images={product.images} />
          </div>
        </div>
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
