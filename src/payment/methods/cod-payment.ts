import { EPaymentMethod } from "~/common/model/payment.model";
import { PaymentMethod } from "../payment-method";

export class CODPayment implements PaymentMethod {
  identifier = EPaymentMethod.COD;

  async processPayment(amount: number): Promise<boolean> {
    console.log("Thanh toán khi nhận hàng: ", amount);

    // await paymentApi.processPayment(this.identifier, amount);
    return true;
  }
}
