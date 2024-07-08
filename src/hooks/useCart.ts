import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Item } from "~/common/model/cart.model";

type CartState = {
  itemsCart: Item[];
  setItemToCart: (items: Item[]) => void;
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      itemsCart: [],
      setItemToCart: (itemsCart: Item[]) => set({ itemsCart: itemsCart }),
      addToCart: (newItem) =>
        set((state) => {
          const existedProduct = state.itemsCart.find(
            (item) => item.productId === newItem.productId
          );
          if (!existedProduct) {
            return { itemsCart: [...state.itemsCart, newItem] };
          }
          return { itemsCart: state.itemsCart };
        }),
      removeFromCart: (productId: number) =>
        set((state) => ({
          itemsCart: state.itemsCart.filter(
            (item) => item.productId !== productId
          ),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
