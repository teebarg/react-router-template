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

export interface Base {
    name: string;
    slug: string;
    is_active?: boolean;
}

export interface Tag {
    name: string;
    slug: string;
    is_active?: boolean;
}

export interface Tags {
    tags: Tag[];
}
