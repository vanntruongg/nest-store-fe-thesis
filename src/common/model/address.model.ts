interface AddressDetails {
  id: number;
  name: string;
  type: AddressType;
  code: string;
  parentCode: string;
}

interface Address {
  id: number;
  name: string;
  phone: string;
  street: string;
  province: AddressDetails;
  district: AddressDetails;
  ward: AddressDetails;
  default: boolean;
}

interface DeliveryAddress {
  id: number;
  name: string;
  phone: string;
  street: string;
  province: string;
  district: string;
  ward: string;
}

interface CreateAddressRequest {
  name: string;
  phone: string;
  street: string;
  wardId: number;
  districtId: number;
  provinceId: number;
  userEmail: string;
  isDefault: boolean;
}

type UpdateAddressRequest = Omit<CreateAddressRequest, "isDefault"> & {
  id: number;
};

export enum AddressAction {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  SET_DEFAULT = "set_default",
}

type AddressType = "city" | "district" | "town" | "ward" | "commune";
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
