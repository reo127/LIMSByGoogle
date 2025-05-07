import { create } from 'zustand';
import Cookies from 'js-cookie';

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
    reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    reset: () => {
        localStorage.clear();
        ['token', 'userId', 'labId', 'role'].forEach(Cookies.remove)
        set({ user: null, token: null, isAuthenticated: false });
    },
}));
