import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Address } from "~/common/model/address.model";
import { ItemCheckout } from "~/common/model/cart.model";
import { IOrderShippingDetail } from "~/common/model/order.model";

type CheckoutState = {
  items: ItemCheckout[];
  shippingDetail: IOrderShippingDetail;
  notes: string;
  paymentMethod: number;
  addItem: (item: ItemCheckout) => void;
  removeItem: (itemId: number) => void;
  addItems: (items: ItemCheckout[]) => void;
  setShippingDetail: (
    name: string,
    phone: string,
    address: Address,
    specificAddress: string
  ) => void;
  setPaymentMethod: (methodId: number) => void;
  setNotes: (notes: string) => void;
  clearCheckout: () => void;
  updateQuantityItemCheckOut: (itemId: number, quantity: number) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      shippingDetail: {
        name: "",
        phone: "",
        address: { id: 0, ward: 0, district: 0, city: 0 },
        specificAddress: "",
      },
      paymentMethod: 0,
      notes: "",
      addItem: (item) =>
        set((state) => {
          // item.quantity = quantity;
          return { items: [...state.items, item] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      addItems: (items) =>
        set((state) => {
          return { items: items };
        }),
      updateQuantityItemCheckOut: (itemId: number, newQuantity: number) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        })),
      setShippingDetail: (name, phone, address, specificAddress) =>
        set((state) => {
          return { shippingDetail: { name, phone, address, specificAddress } };
        }),
      setPaymentMethod: (methodId) =>
        set((state) => {
          return { paymentMethod: methodId };
        }),
      setNotes: (notes) =>
        set((state) => {
          return { notes: notes };
        }),
      clearCheckout: () =>
        set({
          items: [],
          shippingDetail: {
            name: "",
            phone: "",
            address: { id: 0, ward: 0, district: 0, city: 0 },
            specificAddress: "",
          },
          paymentMethod: 0,
        }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
