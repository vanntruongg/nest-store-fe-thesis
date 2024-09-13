import { AddressPost } from "./AddressPost";

export type UpdateAddressRequest = Omit<AddressPost, "isDefault"> & {
  id: number;
};
