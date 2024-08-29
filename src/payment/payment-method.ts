import { EPaymentMethod } from "~/common/model/payment.model";

export interface PaymentMethod {
  identifier: EPaymentMethod;
  processPayment(amount: number): Promise<boolean>;
}
