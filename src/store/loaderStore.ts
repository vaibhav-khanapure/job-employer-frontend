import { create } from "zustand";
import type { LoaderStoreState, LoaderStoreTypes } from "../types/store/loaderStore.types";

const initialState: LoaderStoreState = {
    pageLoader: {
        show: false
    }
};

const useLoaderStore = create<LoaderStoreTypes>(() => ({
    ...initialState,

    resetState: () => ({ ...initialState })
}));

export default useLoaderStore;