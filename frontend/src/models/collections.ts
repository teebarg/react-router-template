export interface Collection {
    name: string;
    slug: string;
    is_active?: boolean;
}

export interface Collections {
    collections: Collection[];
}
