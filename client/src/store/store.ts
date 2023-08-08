import { create } from "zustand";

interface IStore {
  user: string;
  loading: boolean;
  signIn: () => void;
  signUp: () => void;
  logout: () => void;
}

const useStore = create<IStore>()((set) => ({
  user: "",
  loading: true,
  signIn: () => {},
  signUp: () => {},
  logout: () => {},
}));

export default useStore;
