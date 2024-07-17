export interface Product {
    name: string;
    slug?: string;
    description?: string;
    price: number;
    old_price?: number;
    image: string;
    is_active?: boolean;
    rating?: number;
}

export interface Products {
    products: Product[];
}
