export enum EPaymentMethod {
  COD = "COD",
  VN_PAY = "VN_PAY",
  // ZALO_PAY = "ZALO_PAY",
  // MOMO = "MOMO",
}

interface IPaymentMethod {
  id: number;
  name: string;
  method: EPaymentMethod;
  description: string;
}

export type { IPaymentMethod };
