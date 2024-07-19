"use client";

import { useEffect, useState } from "react";
import orderApi from "~/apis/order-api";
import { IPaymentMethod } from "~/common/model/order.model";
import TooltipCustom from "~/components/tooltip-custom";
import { useCheckout } from "~/hooks/useCheckout";
import { cn } from "~/lib/utils";

export function PaymentMethod() {
  const { paymentMethod, setPaymentMethod } = useCheckout();
  const [methods, setMethods] = useState<IPaymentMethod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await orderApi.getAllPaymentMethod();
      setMethods(result.payload.data);
    };
    fetchData();
  }, []);

  return (
    <section className="flex items-center gap-4 bg-white p-4">
      <p>Phương thức thanh toán</p>
      <div className="flex gap-2">
        {methods.map((method) => (
          <TooltipCustom
            key={method.paymentMethodId}
            trigger={
              <div
                className={cn(
                  "border py-1 px-4 cursor-pointer rounded-sm hover:border-primary hover:text-primary transition-all duration-300",
                  {
                    "border-primary text-primary":
                      paymentMethod?.paymentMethodId === method.paymentMethodId,
                  }
                )}
                onClick={() => setPaymentMethod(method)}
              >
                {method.method}
              </div>
            }
            content={method.description}
          ></TooltipCustom>
        ))}
      </div>
    </section>
  );
}
