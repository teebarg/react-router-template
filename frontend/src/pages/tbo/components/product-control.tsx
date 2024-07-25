import { Button, Input } from "@nextui-org/react";
import { PlusIcon } from "nui-react-icons";
import { Product } from "@/models/product";
import { useCart } from "@/store/cart-provider";
import { CartItem } from "@/models/commerce";
import React from "react";

interface ComponentProps {
    product: Product;
}

const ProductControl: React.FC<ComponentProps> = ({ product }) => {
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    const target = cartItems.find((item: CartItem) => item.product_id == product.id);

    if (!target) {
        return (
            <Button onPress={() => updateQuantity(product.id, 1)} color="primary" variant="shadow" className="w-full mt-3 h-12">
                Add to Cart
            </Button>
        );
    }
    return (
        <React.Fragment>
            <div className="flex items-center">
                <Button isIconOnly onClick={() => updateQuantity(product.id, target.quantity - 1)} className="w-16">
                    <PlusIcon className="w-6 h-6" />
                </Button>
                <span className="mx-2 w-8 text-center">{target.quantity}</span>
                <Button isIconOnly onClick={() => updateQuantity(product.id, target.quantity + 1)} className="w-16">
                    <PlusIcon className="w-6 h-6" />
                </Button>
                <button onClick={() => removeFromCart(product.id)} className="ml-2 text-red-500">
                    Remove
                </button>
            </div>
        </React.Fragment>
    );
};

export { ProductControl };
