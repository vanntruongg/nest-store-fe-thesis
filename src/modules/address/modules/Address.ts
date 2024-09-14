import { Location } from "./Loation";

export type Address = {
  id: number;
  name: string;
  phone: string;
  street: string;
  province: Location;
  district: Location;
  ward: Location;
  isDefault: boolean;
};

export type AddressIdType = "wardId" | "districtId" | "provinceId";

export type AddressLevel = "ward" | "district" | "province";
