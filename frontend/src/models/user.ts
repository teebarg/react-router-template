export interface User {
    id: string;
    email: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface Users {
    data: User[];
}
