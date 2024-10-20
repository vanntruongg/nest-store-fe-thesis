"use client";

import { useEffect } from "react";
import { MESSAGES } from "~/common/constants/messages";
import TooltipCustom from "~/common/components/tooltip-custom";
import { useCheckout } from "~/hooks/useCheckout";
import { cn } from "~/lib/utils";
import { EPaymentMethod } from "~/modules/payment/model/EPaymentMethod";
import { PaymentMethod as PaymentMethodModel } from "~/modules/payment/model/PaymentMethod";

const paymentMethods: PaymentMethodModel[] = [
  {
    id: 1,
    name: "Thanh toán khi nhận hàng",
    method: EPaymentMethod.COD,
    description: "Thanh toán khi nhận hàng",
  },
  {
    id: 2,
    name: "Ví VN Pay",
    method: EPaymentMethod.VN_PAY,
    description: "Thanh toán qua ví điện tử VN Pay",
  },
];

interface PaymentMethodProps {
  error: boolean;
  setError: (error: boolean) => void;
}

export function PaymentMethod({ error, setError }: PaymentMethodProps) {
  const { paymentMethod, setPaymentMethod } = useCheckout();

  useEffect(() => {
    setError(false);
  }, [paymentMethod, setError]);

  return (
    <section
      className={cn("flex flex-col gap-2 bg-white p-4", {
        "bg-red-100": error,
      })}
    >
      <div className="grid grid-cols-10 items-center">
        <p className="col-span-2">Phương thức thanh toán</p>
        <div className="col-span-8 flex gap-2">
          {paymentMethods.map((method) => (
            <TooltipCustom key={method.id} content={method.description}>
              <div
                className={cn(
                  "bg-white border py-1 px-4 cursor-pointer rounded-sm hover:border-primary hover:text-primary transition-all duration-300 relative overflow-hidden",
                  {
                    "border-primary text-primary":
                      paymentMethod?.id === method.id,
                  }
                )}
                onClick={() => setPaymentMethod(method)}
              >
                {paymentMethod === method && (
                  <div
                    className={cn(
                      "absolute size-6 -bottom-3 -right-3 bg-primary rotate-45 text-white"
                    )}
                  >
                    <span className="absolute -rotate-45 text-xs left-0 top-1/2 -translate-y-1/2">
                      &#10004;
                    </span>
                  </div>
                )}
                {method.name}
              </div>
            </TooltipCustom>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-10">
        {error && (
          <span className="col-start-3 col-span-8 text-sm text-red-500">
            {MESSAGES.SELECT_PAYMENT_METHOD}
          </span>
        )}
      </div>
    </section>
  );
}
