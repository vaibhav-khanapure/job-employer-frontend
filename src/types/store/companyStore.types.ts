export interface CompanyStoreState {
    company: null | {
        name: string;
        slug: string;
    };
};

export interface CompanyStoreActions {
    resetState: () => void;
};

export interface CompanyStoreTypes extends CompanyStoreState, CompanyStoreActions { };