import { AddressPost } from "./AddressPost";

export type AddressPut = Omit<AddressPost, "isDefault"> & {
  id: number;
};
