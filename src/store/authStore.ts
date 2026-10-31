import { create } from "zustand";
import type { AuthStoreState, AuthStoreTypes } from "../types/store/authStore.types";

const initialState: AuthStoreState = {
    isAuth: false
};

const useAuthStore = create<AuthStoreTypes>((set) => ({
    ...initialState,

    resetState: () => set({
        ...initialState,
        accessToken: "",
        shouldRegenerateAccessToken: false,
        showGoogleRegisterModal: false
    })
}));

export default useAuthStore;