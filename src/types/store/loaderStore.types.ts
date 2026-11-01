export interface LoaderStoreState {
    pageLoader: {
        show: boolean;
        text?: string;
    };
};

export interface LoaderStoreActions {
    resetState: () => void;
};

export interface LoaderStoreTypes extends LoaderStoreState, LoaderStoreActions { };