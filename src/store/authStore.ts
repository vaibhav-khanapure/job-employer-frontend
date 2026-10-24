import { create } from "zustand";
import type { AuthStoreState } from "../types/store/authStore.types";

const initialState: AuthStoreState = {
    isAuth: false
};

const useAuthStore = create<AuthStoreState>((set) => ({
    ...initialState,

    resetState: () => set(initialState)
}));

export default useAuthStore;