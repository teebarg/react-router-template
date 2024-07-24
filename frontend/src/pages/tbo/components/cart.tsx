import { Badge, Button, Image } from "@nextui-org/react";
import { CancelIcon, CartIcon } from "nui-react-icons";
import { useOverlayTriggerState } from "@react-stately/overlays";
import { SlideOver } from "@/components/core/slideOver";
import { Link } from "react-router-dom";
import { Cart as CartModel, CartItem } from "@/models/commerce";
import { currency } from "@/utils/util";
import { CartItems } from "./cart-items";

interface ComponentProps {
    onClick?: () => void;
}

const Cart: React.FC<ComponentProps> = ({ onClick }) => {
    const cart: CartModel = {} as CartModel;
    const state = useOverlayTriggerState({});
    const closeSlideOver = () => {
        state.close();
    };

    return (
        <div className="">
            <Badge content={42} shape="circle" color="danger">
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
                    <div className="flex gap-2 justify-end p-2">
                        <Button onPress={state.close} color="danger" className="min-w-32">
                            Cancel
                        </Button>
                        {/* <Button variant="shadow" color="primary" className="min-w-32" onPress={() => formRef?.current?.submit()}>
                            Submit
                        </Button> */}
                    </div>
                }
            >
                {state.isOpen && <CartItems cart={cart} />}
            </SlideOver>
        </div>
    );
};

export { Cart };
