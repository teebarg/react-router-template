import { Badge, Button } from "@nextui-org/react";
import { CartIcon } from "nui-react-icons";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { SlideOver } from "@/components/core/slideOver";
import { Link } from "react-router-dom";
import { currency } from "@/utils/util";
import { CartItems } from "./cart-items";
import { useCart } from "@/store/cart-provider";
import React from "react";

interface ComponentProps {}

const Cart: React.FC<ComponentProps> = () => {
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
            {state.isOpen && (
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
                                    <Link
                                        className="inline-flex items-center justify-center whitespace-nowrap font-normal overflow-hidden px-4 min-w-20 h-10 text-small gap-2 rounded-medium bg-primary text-primary-foreground w-full"
                                        to={"/tbo/checkout"}
                                    >
                                        Checkout
                                    </Link>
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
                    <CartItems />
                </SlideOver>
            )}
        </div>
    );
};

export { Cart };
