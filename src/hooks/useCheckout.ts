import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Address } from "~/common/model/address.model";
import { ItemCheckout } from "~/common/model/cart.model";
import { IOrderShippingDetail } from "~/common/model/order.model";

type CheckoutState = {
  items: ItemCheckout[];
  deliveryAddress: number;
  notes: string;
  paymentMethod: number;
  addItem: (item: ItemCheckout) => void;
  removeItem: (itemId: number) => void;
  addItems: (items: ItemCheckout[]) => void;
  setDeliveryAddress: (deliveryAddress: number) => void;
  setPaymentMethod: (methodId: number) => void;
  setNotes: (notes: string) => void;
  clearCheckout: () => void;
  updateQuantityItemCheckOut: (itemId: number, quantity: number) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      deliveryAddress: 0,
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
      setDeliveryAddress: (deliveryAddress: number) =>
        set((state) => {
          return { deliveryAddress: deliveryAddress };
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
          deliveryAddress: 0,
          paymentMethod: 0,
        }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
