"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useCheckout } from "~/hooks/useCheckout";
import { ProductUtil } from "~/common/utility/product.util";
import { BaseUtil } from "~/common/utility/base.util";
import { IOrderRequest } from "~/common/model/order.model";
import { DeliveryAddress } from "./delivery-address";
import { PaymentMethod } from "./payment-method";
import { useUser } from "~/hooks/useUser";
import IconTextLoading from "~/components/icon-text-loading";
import Loading from "~/components/loading";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { useRouter } from "next/navigation";
import { ItemCheckOutPlaceholder } from "~/components/skeleton/item-checkout";
import orderApi from "~/apis/order-api";
import { EPaymentMethod } from "~/common/model/payment.model";
import { ROUTES } from "~/common/constants/routes";

const CheckOutPage = () => {
  const { items, notes, deliveryAddress, setNotes, paymentMethod } =
    useCheckout();
  const { user } = useUser();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [paymentMethodError, setPaymentMethodError] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalPrice = useMemo(
    () => items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
    [items]
  );

  const handleCheckOut = async () => {
    if (!paymentMethod) {
      setPaymentMethodError(true);
      return;
    }
    setLoading(true);
    try {
      await createOrder();
    } catch (error) {
      BaseUtil.handleErrorApi({ error });
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    let orderRequest: IOrderRequest;
    if (deliveryAddress && paymentMethod) {
      orderRequest = {
        email: user.email,
        addressId: deliveryAddress?.id,
        notes,
        paymentMethodId: paymentMethod?.id,
        listProduct: items.map(({ productId, quantity, size }) => ({
          productId: productId,
          quantity: quantity,
          size,
        })),
      };

      try {
        // const result = await orderApi.createOrder(orderRequest);
        // if (result.payload.data.paymentMethod.method === EPaymentMethod.COD) {
        //   router.push(ROUTES.THANK_YOU);
        // } else {
        //   window.location.href = result.payload.data.urlPayment;
        // }
      } catch (error) {
        BaseUtil.handleErrorApi({ error });
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
      {loading && <Loading />}
      <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        Thanh toán
      </h1>

      <DeliveryAddress />

      {/* List items */}
      <div className="h-full w-full bg-white py-6 divide-y relative">
        <div className="px-8 py-2 flex items-center">
          <div className="w-full grid grid-cols-6 gap-4">
            <div className="flex-1 col-span-3">Sản phẩm</div>
            <div className="col-span-3 flex justify-between text-muted-foreground">
              <span className="w-full text-center">Đơn giá</span>
              <span className="w-full text-center">Số lượng</span>
              <span className="w-full text-center">Thành tiền</span>
            </div>
          </div>
        </div>

        <div className="px-8 divide-y">
          {isMounted ? (
            items.map((item) => {
              return (
                <div
                  key={item.productId}
                  className="w-full grid grid-cols-6 gap-4 py-6 sm:py-10"
                >
                  <div className="flex flex-1 gap-4 col-span-3">
                    <div className="relative min-w-24 aspect-square rounded-md overflow-hidden">
                      <Image
                        src={item.image}
                        sizes="100"
                        fill
                        alt="product image"
                        className="object-center sm:size-48"
                      />
                    </div>
                    <div className="">
                      <h3 className="text-base font-medium">{item.name}</h3>
                      <div className="">
                        <span>Phân loại (size):</span>
                        <p>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 flex flex-1 items-center justify-between text-sm text-muted-foreground">
                    <div className="w-full text-center">
                      {ProductUtil.formatPrice(item.price)}
                    </div>
                    <div className="w-full text-center">{item.quantity}</div>
                    <div className="w-full text-center">
                      {ProductUtil.formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="divide-y">
              <ItemCheckOutPlaceholder />
              <ItemCheckOutPlaceholder />
              <ItemCheckOutPlaceholder />
            </div>
          )}
        </div>
      </div>
      {/* Order */}
      <div className="">
        {/* notes */}
        <section className="py-6">
          <Label>Ghi chú:</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Lưu ý cho cửa hàng"
          />
        </section>

        <PaymentMethod
          error={paymentMethodError}
          setError={setPaymentMethodError}
        />

        <section className="flex items-center justify-between bg-white py-4 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-6">
          <div className="flex items-center justify-between gap-4 ">
            <div className="text-base font-medium text-gray-900">
              Tổng thanh toán {`(${isMounted ? items.length : 0} Sản phẩm)`}:
            </div>
            <div className="text-base font-medium text-gray-900">
              {isMounted ? (
                ProductUtil.formatPrice(totalPrice)
              ) : (
                <IconTextLoading />
              )}
            </div>
          </div>
          <div className="">
            <Button
              className={cn("w-full", {
                "opacity-50 pointer-events-none":
                  isMounted && items.length === 0,
              })}
              size={"lg"}
              onClick={handleCheckOut}
            >
              Đặt hàng
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckOutPage;
