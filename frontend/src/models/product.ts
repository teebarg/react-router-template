export interface Product {
    name: string;
    slug: string;
    is_active?: boolean;
}

export interface Products {
    products: Product[];
}
