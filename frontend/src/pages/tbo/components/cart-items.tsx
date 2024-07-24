import { Badge, Button, Image } from "@nextui-org/react";
import { CancelIcon, CartIcon } from "nui-react-icons";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { SlideOver } from "@/components/core/slideOver";
import { Link } from "react-router-dom";
import { Cart as CartModel, CartItem } from "@/models/commerce";
import { currency } from "@/utils/util";

interface ComponentProps {
    cart: CartModel;
    onClick?: () => void;
}

const EmptyCartState = () => {
    return (
        <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-sm h-full">
            <CartIcon className="w-20 h-20 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-default-800 mb-2">Your cart is empty</h2>
            <p className="text-default-500 text-center mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Button variant="shadow" color="secondary">
                Start Shopping
            </Button>
        </div>
    );
};

const CartItems: React.FC<ComponentProps> = ({ cart, onClick }) => {
    if (!cart?.items) {
        return <EmptyCartState />;
    }
    return (
        <div className="w-full rounded-medium bg-content2 px-2 py-4 dark:bg-content1 md:px-6 md:py-8 lg:flex-none">
            <div>
                <h2 className="font-medium text-default-500">Your Order</h2>
                <hr className="shrink-0 bg-divider border-none w-full h-divider mt-4" role="separator" />
                <h3 className="sr-only">Items in your cart</h3>
                <ul>
                    {cart?.items?.map((item: CartItem, key: number) => (
                        <li key={key} className="flex items-center gap-x-4 border-b-small border-divider py-4">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: "fit-content" }}>
                                    <Image src={item.product.image} alt="Running shoes" />
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
                            <Button isIconOnly className="rounded-full px-0 !gap-0 bg-default/40 h-7 w-7 min-w-[1.5rem]">
                                <CancelIcon size={14} role="img" className="" />
                            </Button>
                        </li>
                    ))}
                </ul>
                <div>
                    <dl className="flex flex-col gap-4 py-4">
                        <div className="flex justify-between">
                            <dt className="text-small text-default-500">Subtotal</dt>
                            <dd className="text-small font-semibold text-default-700">$159.96</dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="mt-4">
                <Button color="primary" className="w-full">
                    Checkout
                </Button>
            </div>
            <div className="mt-6 flex items-center justify-center text-center text-sm">
                <p>
                    or
                    <Link to={"/tbo/collections"} className="font-medium">
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                    </Link>
                </p>
            </div>
        </div>
    );
};

export { CartItems };
