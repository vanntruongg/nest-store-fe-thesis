"use client";

import Image from "next/image";
import { cn } from "~/lib/utils";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useEffect, useMemo, useState } from "react";
import { useCheckout } from "~/hooks/useCheckout";
import { useUser } from "~/hooks/useUser";
import cartApi from "~/apis/cart-api";
import { CheckedState } from "@radix-ui/react-checkbox";
import CartItem from "~/app/(guest)/cart/cart-item";
import { CartResponse, ItemCheckout } from "~/common/model/cart.model";
import { BaseUtil } from "~/common/utility/base.util";
import { ROUTES } from "~/common/constants/routes";
import { Skeleton } from "~/components/ui/skeleton";
import { ItemCartPlaceholder } from "~/components/skeleton/item-cart";
import { Loader2 } from "lucide-react";
import { ProductUtil } from "~/common/utility/product.util";

const Cart = () => {
  const { user } = useUser();
  const { items, addItems, clearCheckout } = useCheckout();
  const [products, setProducts] = useState<CartResponse>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const result = await cartApi.getAll(user.email);
      const data = result.payload.data;
      setProducts(data);
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    }
  };

  useEffect(() => {
    fetchData();
    setIsMounted(true);
  }, []);

  const toggleSelectAll = (checked: CheckedState) => {
    if (checked) {
      const items: ItemCheckout[] | undefined = products?.items.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.imageUrl,
        quantity: item.quantity,
      }));
      addItems(items || []);
    } else {
      clearCheckout();
    }
  };

  const totalPrice = useMemo(() => {
    return items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  }, [items]);

  return (
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
            </div>
          </div>
        ) : (
          <div className="h-full w-full relative">
            <div className="flex items-center px-8 py-4 bg-white shadow">
              <div className="mt-1 pr-4">
                <Checkbox
                  onCheckedChange={toggleSelectAll}
                  checked={products?.items.length === items.length}
                />
              </div>
              <div className="grid grid-cols-12 w-full gap-4">
                <div className="col-span-6 w-full">Sản phẩm</div>
                <div className="col-span-6 grid grid-cols-4 text-center">
                  <span>Đơn giá</span>
                  <span>Số lượng</span>
                  <span>Thành tiền</span>
                  <span>Thao tác</span>
                </div>
              </div>
            </div>

            <div className="px-8 my-4 bg-white divide-y">
              {products?.items && products?.items.length > 0 ? (
                products?.items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    fetchData={fetchData}
                  />
                ))
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
                  className={cn(buttonVariants({ size: "lg", className: "" }), {
                    "opacity-50 pointer-events-none": items.length === 0,
                  })}
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
  );
};

export default Cart;
