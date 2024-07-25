import { Button, Image } from "@nextui-org/react";
import { CancelIcon, CartIcon } from "nui-react-icons";
import { Link } from "react-router-dom";
import { CartItem } from "@/models/commerce";
import { currency, imgSrc } from "@/utils/util";
import { useCart } from "@/store/cart-provider";

interface ComponentProps {
    onClick?: () => void;
}

const EmptyCartState = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-sm h-full">
            <CartIcon className="w-20 h-20 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-default-800 mb-2">Your cart is empty</h2>
            <p className="text-default-500 text-center mb-6">{`Looks like you haven't added anything to your cart yet.`}</p>
            <Button variant="shadow" color="secondary">
                Start Shopping
            </Button>
        </div>
    );
};

const CartItems: React.FC<ComponentProps> = ({ onClick }) => {
    const { cartItems, removeFromCart } = useCart();

    if (cartItems.length == 0) {
        return <EmptyCartState />;
    }

    // const subTotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return (
        <div className="w-full rounded-medium bg-content2 px-2 py-4 dark:bg-content1 lg:flex-none max-h-full overflow-auto">
            <div>
                <h2 className="font-medium text-default-500">Your Order</h2>
                <hr className="shrink-0 bg-divider border-none w-full h-divider mt-4" role="separator" />
                <ul>
                    {cartItems?.map((item: CartItem, key: number) => (
                        <li key={key} className="flex items-center gap-x-4 border-b-small border-divider py-4">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content" }}>
                                    <Image src={imgSrc(`products%2F${item.product.image}`)} alt={item.product.image} />
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col">
                                <h4 className="text-small">
                                    <Link role="link" to={`/tbo/product/${item.product.slug}`}>
                                        {item.product.name}
                                    </Link>
                                </h4>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-small font-semibold text-default-700">{currency(item.product.price)}</span>
                                    <span className="text-small text-default-500">x {item.quantity}</span>
                                </div>
                            </div>
                            <Button onPress={() => removeFromCart(item.id)} isIconOnly className="rounded-full px-0 !gap-0 bg-default/40 h-7 w-7 min-w-[1.5rem]">
                                <CancelIcon size={14} role="img" className="" />
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export { CartItems };
