// src/store/auth.ts
import { create } from "zustand"

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  labId: string;
  gender: string;
  phone_number: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => set({ token, isAuthenticated: !!token }),
  logout: () => {
    localStorage.clear();
    ['token', 'userId', 'labId', 'role'].forEach(Cookies.remove)
    set({ user: null, token: null, isAuthenticated: false });
  }
}))
