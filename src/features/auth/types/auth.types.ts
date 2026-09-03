export interface AuthUser {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
}

export interface AuthState {
    user: AuthUser | null;
    isLoading: boolean;
}
export interface AuthData {
    email: string;
    password: string;
}
