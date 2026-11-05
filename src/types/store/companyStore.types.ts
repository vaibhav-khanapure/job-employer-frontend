export interface CompanyStoreState {
};

export interface CompanyStoreActions {
    resetState: () => void;
};

export interface CompanyStoreTypes extends CompanyStoreState, CompanyStoreActions { };