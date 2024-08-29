import { EPaymentMethod } from "~/common/model/payment.model";
import { PaymentMethod } from "../payment-method";

export class ZalopayPayment implements PaymentMethod {
  identifier = EPaymentMethod.ZALO_PAY;

  async processPayment(amount: number): Promise<boolean> {
    console.log("Thanh toán qua Zalopay: ", amount);
    // await paymentApi.processPayment(this.identifier, amount);
    return true;
  }
}
