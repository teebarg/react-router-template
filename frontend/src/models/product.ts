export interface Product {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    price: number;
    old_price: number;
    image: string;
    is_active?: boolean;
    ratings?: number;
}

export interface Products {
    products: Product[];
}
