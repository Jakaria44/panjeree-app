import { authService } from "@/utils/api";
import { atom } from "jotai";

export type User = {
  id: number;
  name: string;
  phone: string;
  school: string;
  gender: string;
  class_id: number;
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
};

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
});

// Actions
export const loginAction = atom(
  null,
  async (
    get,
    set,
    { mobile, password }: { mobile: string; password: string }
  ) => {
    set(authAtom, (prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await authService.login(mobile, password);

      // For now, we'll use mock user data since the API response doesn't include user details
      // In a real app, you would extract user data from the response
      const user: User = {
        id: 1,
        name: "John Doe",
        phone: mobile,
        school: "RUMC",
        gender: "male",
        class_id: 6,
      };

      set(authAtom, {
        isAuthenticated: true,
        user,
        isLoading: false,
      });

      return response;
    } catch (error) {
      set(authAtom, (prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }
);

export const logoutAction = atom(null, async (get, set) => {
  try {
    await authService.logout();
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
});

export const checkAuthAction = atom(null, async (get, set) => {
  set(authAtom, (prev) => ({ ...prev, isLoading: true }));

  try {
    const token = await authService.getStoredToken();

    if (token) {
      // For now, we'll assume the user is authenticated if token exists
      // In a real app, you would validate the token with the server
      const user: User = {
        id: 1,
        name: "John Doe",
        phone: "01700000000",
        school: "RUMC",
        gender: "male",
        class_id: 6,
      };

      set(authAtom, {
        isAuthenticated: true,
        user,
        isLoading: false,
      });
    } else {
      set(authAtom, {
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  } catch (error) {
    console.error("Check auth error:", error);
    set(authAtom, {
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  }
});
