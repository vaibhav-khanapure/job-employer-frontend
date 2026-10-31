import { create } from "zustand";
import type { UserStoreState, UserStoreTypes } from "../types/store/userStore.types";

const initialState: UserStoreState = {
    user: null
};

const useUserStore = create<UserStoreTypes>((set) => ({
    ...initialState,

    resetState: () => set({ ...initialState })
}));

export default useUserStore;