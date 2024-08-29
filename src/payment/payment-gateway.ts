import { MESSAGES } from "~/common/constants/messages";
import { VNPayPayment } from "./methods/vnpay-payment";
import { PaymentMethod } from "./payment-method";
import { EPaymentMethod } from "~/common/model/payment.model";

export class PaymentGateway {
  private paymentMethods: PaymentMethod[] = [];

  constructor() {
    this.paymentMethods.push(new VNPayPayment());
  }

  public async processPayment(
    method: EPaymentMethod,
    amount: number
  ): Promise<boolean> {
    const paymentMethod = this.paymentMethods.find(
      (pm) => pm.identifier === method
    );
    if (!paymentMethod) {
      throw new Error(MESSAGES.INVALID_PAYMENT_METHOD);
    }

    paymentMethod.processPayment(amount);

    return true;
  }
}
