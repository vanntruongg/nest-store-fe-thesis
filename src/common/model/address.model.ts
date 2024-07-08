type AddressType = "city" | "district" | "town" | "ward" | "commune";

interface AddressDetails {
  id: number;
  name: string;
  type: AddressType;
  code: string;
  parentCode: string;
}

interface Address {
  id?: number;
  name: string;
  phone: string;
  street: string;
  province: AddressDetails;
  district: AddressDetails;
  ward: AddressDetails;
  default: boolean;
}

interface CreateAddressRequest {
  id?: number;
  name: string;
  phone: string;
  street: string;
  wardId: number;
  districtId: number;
  provinceId: number;
  isDefault: boolean;
  userEmail: string;
}

type UpdateAddressRequest = Omit<
  CreateAddressRequest,
  "isDefault" | "userEmail"
>;

type LocationFieldType = "wardId" | "districtId" | "provinceId";
type LocationType = "ward" | "district" | "province";

export type {
  Address,
  AddressType,
  AddressDetails,
  CreateAddressRequest,
  UpdateAddressRequest,
  LocationFieldType,
  LocationType,
};
