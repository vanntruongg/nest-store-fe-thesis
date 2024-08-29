import { EPaymentMethod } from "~/common/model/payment.model";
import { PaymentMethod } from "../payment-method";

export class VNPayPayment implements PaymentMethod {
  identifier = EPaymentMethod.VN_PAY;

  async processPayment(amount: number): Promise<boolean> {
    console.log("Thanh toán qua VN Pay: ", amount);

    // await paymentApi.processPayment(this.identifier, amount);
    return true;
  }
}
