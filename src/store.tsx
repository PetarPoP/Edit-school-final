import create from "zustand";

interface State {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAdminStore = create<State>((set) => ({
  isAdmin: false,
  setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
}));
