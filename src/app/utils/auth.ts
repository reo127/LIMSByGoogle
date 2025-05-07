import Cookies from "js-cookie";
import { useAuthStore } from "@/app/store/auth";
import { useRouter } from "next/navigation";

export const logout = () => {
  // Clear all cookies
  const cookies = Cookies.get();
  Object.keys(cookies).forEach(cookieName => {
    Cookies.remove(cookieName);
  });
  
  // Clear localStorage
  localStorage.clear();
  
  // Reset auth store state
  const resetAuth = useAuthStore.getState().reset;
  if (resetAuth) {
    resetAuth();
  }
  
  // Redirect to login page
  window.location.href = '/login';
};