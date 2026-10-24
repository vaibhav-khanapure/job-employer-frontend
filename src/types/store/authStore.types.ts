export interface AuthStoreState {
    isAuth: boolean;
    accessToken?: string;
    shouldRegenerateAccessToken?: boolean;
};

export interface AuthStoreActions {
    resetState: () => void;
};

export interface AuthStoreTypes extends AuthStoreState, AuthStoreActions { };