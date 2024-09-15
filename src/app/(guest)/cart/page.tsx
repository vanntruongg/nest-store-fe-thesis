"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";

import Link from "next/link";
import { Button, buttonVariants } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCheckout } from "~/hooks/useCheckout";
import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { CheckedState } from "@radix-ui/react-checkbox";
import { BaseUtil } from "~/common/utility/base.util";
import { ROUTES } from "~/common/constants/routes";
import { Skeleton } from "~/components/ui/skeleton";
import { ItemCartPlaceholder } from "~/common/components/skeleton/item-cart";
import { Loader2 } from "lucide-react";
import { ProductUtil } from "~/common/utility/product.util";
import { Cart as CartModel } from "~/common/model/cart.model";
import CartItem from "./cart-item";
import Breadrumbs from "~/common/components/breadrumbs";
import { Breadrumb } from "~/common/model/base.model";

export interface ItemCheckout {
  productId: number;
  image: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
}
const breadcrumbs: Breadrumb[] = [
  {
    id: 1,
    name: "Giỏ hàng",
    href: ROUTES.CART,
  },
];

const Cart = () => {
  const { items, addItems, clearCheckout } = useCheckout();
  const [products, setProducts] = useState<CartModel | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const result = await cartApi.getAll();
      setProducts(result.payload.data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  useEffect(() => {
    fetchData();
    setIsMounted(true);
  }, []);

  const toggleSelectAll = useCallback(
    (checked: CheckedState) => {
      if (checked && products) {
        const items: ItemCheckout[] = products.items.flatMap(
          ({ product, sizeQuantities }) =>
            sizeQuantities.map(({ size, quantity }) => ({
              productId: product.id,
              image: product.images[0].imageUrl,
              name: product.name,
              price: product.price,
              size,
              quantity,
            }))
        );
        addItems(items);
      } else {
        clearCheckout();
      }
    },
    [products, addItems, clearCheckout]
  );

  const totalPrice = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }, [items]);

  const totalCartQuantity = useMemo(
    () =>
      products?.items.reduce((total, item) => {
        const sizeTotal = item.sizeQuantities.length;
        return total + sizeTotal;
      }, 0),
    [products]
  );

  return (
    <>
      <Breadrumbs breadrumbs={breadcrumbs} context="page" />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Giỏ hàng
        </h1>
        <div className="mt-6">
          {isMounted && products?.items.length === 0 ? (
            <div
              className={cn(
                "lg:col-span-7 rounded-lg border-2 border-dashed border-zinc-200 p-12 h-full"
              )}
            >
              {/* image empty cart */}
              <div className="h-full flex flex-col items-center justify-center space-y-1">
                <div className="relative mb-4 size-40 text-muted-foreground">
                  <Image
                    src={"/assets/empty-cart.svg"}
                    fill
                    loading="eager"
                    alt="empty shopping cart"
                    priority
                  />
                </div>
                <h3 className="font-semibold text-2xl">Giỏ hàng trống</h3>
                <p className="text-muted-foreground text-center">
                  Rất tiếc! Chưa có gì để hiển thị ở đây.
                </p>
                <Link href={ROUTES.SHOP}>
                  <Button>Mua sắm ngay</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="h-full w-full relative">
              <div className="flex items-center px-8 py-4 bg-white shadow">
                <div className="mt-1 pr-4">
                  <Checkbox
                    onCheckedChange={toggleSelectAll}
                    checked={totalCartQuantity === items.length}
                    className="border-gray-500"
                  />
                </div>
                <div className="grid grid-cols-12 w-full gap-4 text-sm">
                  <div className="col-span-6 w-full">Sản Phẩm</div>
                  <div className="col-span-6 grid grid-cols-4 text-center text-gray-500">
                    <span>Đơn Giá</span>
                    <span>Số Lượng</span>
                    <span>Thành Tiền</span>
                    <span>Thao Tác</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 my-4 space-y-4">
                {products?.items && products?.items.length > 0 ? (
                  products.items.map((item) =>
                    item.sizeQuantities.map(({ size, quantity }) => (
                      <CartItem
                        key={`${item.product.id}-${size}`}
                        product={item.product}
                        productSize={size}
                        productQuantity={quantity}
                        fetchData={fetchData}
                      />
                    ))
                  )
                ) : (
                  <>
                    <ItemCartPlaceholder />
                    <ItemCartPlaceholder />
                  </>
                )}
              </div>

              <section className="sticky bottom-0 flex items-center justify-between rounded-lg bg-white shadow py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-6">
                <div className="flex items-center justify-between gap-4 border-gray-200">
                  <div className="text-base font-medium text-gray-900">
                    Tổng thanh toán {isMounted && `(${items.length} Sản phẩm)`}:
                  </div>
                  <div className="text-base font-medium text-gray-900">
                    {isMounted ? (
                      ProductUtil.formatPrice(totalPrice)
                    ) : (
                      <Loader2 className="size-4 animate-spin text-muted-foreground" />
                    )}
                  </div>
                </div>
                {isMounted ? (
                  <Link
                    href={ROUTES.CHECKOUT}
                    className={cn(
                      buttonVariants({ size: "lg", className: "" }),
                      {
                        "opacity-50 pointer-events-none": items.length === 0,
                      }
                    )}
                  >
                    Thanh toán
                  </Link>
                ) : (
                  <Skeleton className="w-36 h-10" />
                )}
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
