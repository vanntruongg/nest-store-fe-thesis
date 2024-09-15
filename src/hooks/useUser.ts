import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "~/modules/user/model/User";

type UserState = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const initialUser: User = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  imageUrl: "",
  roles: [],
};

export const useUser = create<UserState>()(
  persist(
    (set) => ({
      user: initialUser,
      setUser: (user: User) =>
        set({
          user: user,
        }),

      clearUser: () => set({ user: initialUser }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
