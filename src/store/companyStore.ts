import { create } from "zustand";
import type { CompanyStoreState, CompanyStoreTypes } from "../types/store/companyStore.types";

const initialState: CompanyStoreState = {
    company: null
};

const useCompanyStore = create<CompanyStoreTypes>(() => ({
    ...initialState,

    resetState: () => ({ ...initialState })
}));

export default useCompanyStore;