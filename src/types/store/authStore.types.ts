export interface AuthStoreState {
    isAuth: boolean;
    accessToken?: string;
};

export interface AuthStoreActions {
    resetState: () => void;
};

export interface AuthStoreTypes extends AuthStoreState, AuthStoreActions { };