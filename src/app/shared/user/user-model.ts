export interface User {
    uid: string | null;
    email: string | null;
    role?: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
