import { create } from "zustand";

interface IStore {
  application: {
    theme: string;
  };
  user: string;
  loading: boolean;
  signIn: () => void;
  signUp: () => void;
  logout: () => void;
  setTheme: (newTheme: string) => void;
}

const useStore = create<IStore>()((set) => ({
  user: "",
  application: {
    theme: "light",
  },
  loading: true,
  signIn: () => {},
  signUp: () => {},
  logout: () => {},
  setTheme: (newTheme: string) => {
    set((state) => ({
      application: {
        ...state.application,
        theme: newTheme,
      },
    }));
  },
}));

export default useStore;
