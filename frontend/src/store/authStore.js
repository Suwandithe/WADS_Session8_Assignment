import { create } from "zustand";

const API_URL = "http://localhost:3000/api/user";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  message: null,

  signup: async ({email, password, name}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);

      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/verifyEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
  
      if (!response.ok) {
        // Server returned error
        const errorMessage = data?.message || "Verification failed";
        set({ isLoading: false, error: errorMessage });
        return { success: false, error: errorMessage };
      }
  
      set({ isLoading: false, isAuthenticated: true, user: data.user });
      return { success: true };
    } catch (error) {
      const message = error.message || "Something went wrong";
      set({ isLoading: false, error: message });
      return { success: false, error: message };
    }
  },
  
  login: async ({email, password}) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      set({ isLoading: false, isAuthenticated: true, user: data.user });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);
      throw error;
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  }
}));