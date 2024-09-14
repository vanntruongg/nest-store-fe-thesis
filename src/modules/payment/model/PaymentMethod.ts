import { EPaymentMethod } from "./EPaymentMethod";

export type PaymentMethod = {
  id: number;
  name: string;
  method: EPaymentMethod;
  description: string;
};
