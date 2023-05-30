export interface User {
    uid: string | null;
    email: string | null;
}

export interface UserLogin {
    email: string;
    password: string;
}