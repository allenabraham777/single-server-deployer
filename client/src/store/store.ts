import { create } from "zustand";
import { getUserDetails, loginUser, signupUser } from "helpers/api/user";

interface IStore {
  user: {
    name: string;
    email: string;
    isLoggedIn: boolean;
    loading: boolean;
  };
  signIn: (username: string, password: string) => void;
  signUp: () => void;
  logout: () => void;
  setUserFromToken: () => void;
}

const useStore = create<IStore>()((set) => ({
  user: {
    name: "User Name Here",
    email: "user@example.com",
    isLoggedIn: false,
    loading: true,
  },
  signIn: async (username: string, password: string) => {
    let payload = {
      name: "",
      email: "",
      isLoggedIn: false,
      loading: false,
    };
    try {
      const { name, email, token } = await signupUser();
      payload = {
        name,
        email,
        isLoggedIn: true,
        loading: false,
      };
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error(error);
    }
    set({ user: payload });
  },
  signUp: async () => {
    let payload = {
      name: "",
      email: "",
      isLoggedIn: false,
      loading: false,
    };
    try {
      const { name, email, token } = await loginUser();
      payload = {
        name,
        email,
        isLoggedIn: true,
        loading: false,
      };
      localStorage.setItem("authToken", token);
    } catch (error) {
      console.error(error);
    }
    set({ user: payload });
  },
  logout: () => {
    localStorage.setItem("authToken", "");
    set({
      user: {
        name: "",
        email: "",
        isLoggedIn: false,
        loading: false,
      },
    });
  },
  setUserFromToken: async () => {
    const token = localStorage.getItem("authToken");
    let payload = {
      name: "",
      email: "",
      isLoggedIn: false,
      loading: false,
    };
    if (token) {
      try {
        const { name, email } = await getUserDetails(token);
        payload = {
          name,
          email,
          isLoggedIn: true,
          loading: false,
        };
      } catch (error) {
        console.error(error);
      }
    }
    set({ user: payload });
  },
}));

export default useStore;
