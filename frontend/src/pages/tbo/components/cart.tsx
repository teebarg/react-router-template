import { Badge, Button, Image } from "@nextui-org/react";
import { CancelIcon, CartIcon } from "nui-react-icons";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { SlideOver } from "@/components/core/slideOver";
import { Link } from "react-router-dom";
import { CartItem } from "@/models/commerce";
import { currency } from "@/utils/util";
import { CartItems } from "./cart-items";
import { useCart } from "@/store/cart-provider";
import React from "react";

interface ComponentProps {
    onClick?: () => void;
}

const Cart: React.FC<ComponentProps> = ({ onClick }) => {
    const { cartItems } = useCart();
    const subTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const state = useOverlayTriggerState({});
    const closeSlideOver = () => {
        state.close();
    };

    return (
        <div>
            <Badge content={totalItems} shape="circle" color="danger">
                <Button radius="full" isIconOnly variant="light" onPress={state.open}>
                    <CartIcon size={32} />
                </Button>
            </Badge>
            <SlideOver
                isOpen={state.isOpen}
                onClose={closeSlideOver}
                className="bg-default-50"
                title="Carts"
                footer={
                    <React.Fragment>
                        <div className="p-2">
                            <dl className="flex flex-col gap-4 py-4">
                                <div className="flex justify-between">
                                    <dt className="text-small text-default-500">Subtotal</dt>
                                    <dd className="text-small font-semibold text-default-700">{currency(subTotal)}</dd>
                                </div>
                            </dl>
                            <div className="mt-4">
                                <Button onPress={state.close} color="primary" className="w-full">
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
                    </React.Fragment>
                }
            >
                {state.isOpen && <CartItems />}
            </SlideOver>
        </div>
    );
};

export { Cart };
