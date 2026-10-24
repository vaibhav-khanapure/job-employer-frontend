export interface UserStoreState {
    name: string;
    email: string;
};

export interface UserStoreActions {
    resetState: () => void;
};

export interface UserStoreTypes extends UserStoreState, UserStoreActions { };