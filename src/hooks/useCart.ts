import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type CartState = {
  cartLength: number;
  setCartLength: (length: number) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      cartLength: 0,
      setCartLength: (length: number) => set({ cartLength: length }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
