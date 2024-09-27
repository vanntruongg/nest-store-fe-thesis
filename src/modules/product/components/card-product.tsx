"use client";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utils";
import AddtoWishlistIcon from "../../../common/components/buttons/wishlist-icon";
import QuickViewIcon from "../../../common/components/buttons/quick-view-icon";
import { ProductUtil } from "~/common/utility/product.util";
import { ELayoutProduct } from "~/common/utility/enum.util";
import { Product } from "../models/Product";

interface CardProductProps {
  product: Product;
  layout?: ELayoutProduct;
}

const CardProduct = ({ product, layout }: CardProductProps) => {
  return (
    <div
      className={cn("group grid transition-all duration-500 animate-fadeIn", {
        "grid-cols-3 border transition-all duration-500":
          layout === ELayoutProduct.LIST,
        "grid-rows-subgrid row-span-3 gap-0": layout === ELayoutProduct.GRID,
      })}
    >
      <figure
        className={cn("w-full aspect-square relative overflow-hidden", {})}
      >
        <Link
          href={`${ProductUtil.createSlug(product.name, product.id)}`}
          className="size-full absolute"
        >
          <Image
            fill
            src={product.imageUrl}
            alt="image product"
            sizes="full"
            priority
            className={cn(
              "object-cover bg-gray-50 transition-all duration-500",
              {
                "group-hover:scale-110": layout === ELayoutProduct.GRID,
              }
            )}
          />
        </Link>
        {/* {layout === ELayoutProduct.GRID && (
          <div className="w-full bottom-0 absolute flex gap-4 justify-center">
            <QuickViewIcon product={product} className="translate-y-14" />
            <AddtoWishlistIcon product={product} className="translate-y-14" />
          </div>
        )} */}
      </figure>

      <div
        className={cn("w-full grid", {
          "col-span-2 flex flex-col justify-between p-8":
            layout === ELayoutProduct.LIST,
          "grid-rows-subgrid row-span-2 p-2": layout === ELayoutProduct.GRID,
        })}
      >
        <Link
          href={`${ProductUtil.createSlug(product.name, product.id)}`}
          className={cn(
            "text-base text-pretty font-medium text-gray-700 hover:text-gray-800 pb-2",
            {
              "self-start": layout !== ELayoutProduct.GRID,
            }
          )}
        >
          {product.name}
        </Link>
        {layout === ELayoutProduct.LIST && (
          <div>
            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>Chất liệu:</span>
              <p>{product.material}</p>
            </div>
            <div className="mt-1 flex gap-2 text-sm text-muted-foreground">
              <span>Phong cách:</span>
              <p>{product.style}</p>
            </div>
          </div>
        )}
        <p
          className={cn("mt-2 font-semibold", {
            "text-center": layout === ELayoutProduct.GRID,
          })}
        >
          {ProductUtil.formatPrice(product.price)}
        </p>
        {/* {layout === ELayoutProduct.LIST && (
          <div className={cn("flex gap-4 transition-all duration-500")}>
            <QuickViewIcon product={product} />
            <AddtoWishlistIcon product={product} />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default CardProduct;
