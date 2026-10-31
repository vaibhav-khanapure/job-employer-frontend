export interface UserStoreState {
    user: null | {
        email: string;
        name: string;
        role: 'admin' | 'hr' | 'recruiter' | 'hiring_manager';
    };
};

export interface UserStoreActions {
    resetState: () => void;
};

export interface UserStoreTypes extends UserStoreState, UserStoreActions { };