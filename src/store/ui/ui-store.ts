import { create } from "zustand";

interface State {
  isOpenSideMenu: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isOpenSideMenu: false,

  openSideMenu: () => {
    set({ isOpenSideMenu: true });
  },

  closeSideMenu: () => {
    set({ isOpenSideMenu: false });
  },
}));
