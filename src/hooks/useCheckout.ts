import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ItemCheckout } from "~/app/(guest)/cart/page";
import { Address } from "~/modules/address/modules/Address";
import { PaymentMethod } from "~/modules/payment/model/PaymentMethod";

type CheckoutState = {
  items: ItemCheckout[];
  deliveryAddress: Address | null;
  notes: string;
  paymentMethod: PaymentMethod | null;
  addItem: (item: ItemCheckout) => void;
  removeItem: (itemId: number, size: string) => void;
  addItems: (items: ItemCheckout[]) => void;
  setDeliveryAddress: (deliveryAddress: Address) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNotes: (notes: string) => void;
  clearCheckout: () => void;
  updateQuantityItemCheckOut: (
    itemId: number,
    quantity: number,
    size: string
  ) => void;
};

export const useCheckout = create<CheckoutState>()(
  persist(
    (set) => ({
      items: [],
      deliveryAddress: null,
      paymentMethod: null,
      notes: "",
      addItem: (item) =>
        set((state) => {
          // item.quantity = quantity;
          return { items: [...state.items, item] };
        }),
      removeItem: (itemId, size) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === itemId && item.size === size)
          ),
        })),
      addItems: (items) =>
        set((state) => {
          return { items: items };
        }),
      updateQuantityItemCheckOut: (
        itemId: number,
        newQuantity: number,
        size: string
      ) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === itemId && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
          ),
        })),
      setDeliveryAddress: (deliveryAddress: Address) =>
        set((state) => {
          return { deliveryAddress: deliveryAddress };
        }),
      setPaymentMethod: (method: PaymentMethod) =>
        set((state) => {
          return { paymentMethod: method };
        }),
      setNotes: (notes) =>
        set((state) => {
          return { notes: notes };
        }),
      clearCheckout: () =>
        set({
          items: [],
          deliveryAddress: null,
          paymentMethod: null,
          notes: "",
        }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
