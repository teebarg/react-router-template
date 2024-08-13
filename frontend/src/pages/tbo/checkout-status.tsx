import React from "react";
import { LoaderFunction, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "@nextui-org/react";
import { Order, OrderItem } from "@/models/commerce";
import orderService from "@/services/order.service";
import { CartIcon, CheckIcon, RightArrowIcon } from "nui-react-icons";
import { currency, imgSrc } from "@/utils/util";

const OrderNotFoundPaymentFailedPage = ({ order_number }: any) => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-content1 py-8 px-12 rounded-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-default-800">Oops! Something went wrong</h2>
                    <p className="mt-2 text-center text-sm text-default-500">
                        {`We couldn't find your order ${order_number} and the payment has failed.`}
                    </p>
                </div>

                <div className="p-4 rounded-md">
                    <p className="text-default-800">Error</p>
                    <p className="text-default-500">Order not found and payment transaction failed.</p>
                </div>

                <div className="rounded-md bg-content2 shadow-sm p-6">
                    <div className="space-y-4">
                        <p className="text-sm text-default-500">{`Don't worry, no charges have been made to your account. Here's what you can do:`}</p>
                        <ul className="list-disc pl-5 text-sm text-default-500 space-y-2">
                            <li>Double-check your order number and try again</li>
                            <li>Ensure your payment details are correct</li>
                            <li>Contact our support team for assistance</li>
                        </ul>
                    </div>
                </div>

                <div className="flex justify-center space-x-4">
                    <Button color="primary">
                        <CartIcon className="h-4 w-4" />
                        Try Again
                    </Button>
                    <Button>
                        <CartIcon className="h-4 w-4" />
                        Go Back
                    </Button>
                </div>

                <p className="mt-2 text-center text-sm text-default-600">
                    Need help?{" "}
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    );
};

interface ComponentProps {}

const checkoutStatusLoader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    console.log("🚀 ~ constcheckoutStatusLoader:LoaderFunction= ~ url:", url);
    try {
        const res = await orderService.get(params.slug as string);
        return { order: res, error: false };
    } catch (error) {
        return { order: null, error: true };
    }
};

const CheckoutStatus: React.FC<ComponentProps> = () => {
    const { order, error } = useLoaderData() as { order: Order; error: boolean };
    const { slug } = useParams();
    const navigate = useNavigate();

    if (error) {
        return <OrderNotFoundPaymentFailedPage order_number={slug} />;
    }

    const steps = [
        { icon: CartIcon, label: "Order Placed" },
        { icon: CartIcon, label: "Order Shipped" },
        { icon: CartIcon, label: "Order Delivered" },
    ];

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-content1 rounded-lg shadow-lg">
            <div className="text-center mb-8">
                <CheckIcon className="w-20 h-20 text-success mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-default-800 mb-2">Order Placed Successfully!</h1>
                <p className="text-default-500">Thank you for your purchase. Your order has been received.</p>
            </div>

            <div className="bg-content2 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-default-600">Order Number:</p>
                        <p className="font-medium">{order.order_number}</p>
                    </div>
                    <div>
                        <p className="text-default-600">Date:</p>
                        <p className="font-medium">{new Date(order.created_at)?.toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-default-600">Total Amount:</p>
                        <p className="font-medium">{currency(order.total_amount ?? 0)}</p>
                    </div>
                    <div>
                        <p className="text-default-600">Status:</p>
                        <p className="font-medium capitalize">{order.status}</p>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <ul className="divide-y divide-gray-200">
                    {order.items?.map((item: OrderItem) => (
                        <li key={item.id} className="py-4 flex justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Image
                                        width="100%"
                                        alt={item.product.name}
                                        className="object-contain h-[50px]"
                                        src={imgSrc(`products%2F${item.product.image}`)}
                                        fallbackSrc="https://via.placeholder.com/300x200"
                                    />
                                    <div>
                                        <p className="font-medium truncate text-sm">{item.product.name}</p>
                                        <p className="text-default-600">X {item?.quantity}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="font-medium">{currency(item.price * item.quantity ?? 0)}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Progress</h2>
                <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center">
                                <div className={`rounded-full p-2 ${index === 0 ? "bg-green-500" : "bg-gray-300"}`}>
                                    <step.icon className={`w-6 h-6 ${index === 0 ? "text-white" : "text-gray-500"}`} />
                                </div>
                                <p className={`mt-2 text-sm ${index === 0 ? "text-green-500 font-medium" : "text-gray-500"}`}>{step.label}</p>
                            </div>
                            {index < steps.length - 1 && <RightArrowIcon className="w-4 h-4 text-gray-400" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="text-center">
                <Button className="mr-4">Track Order</Button>
                <Button onPress={() => navigate("/tbo/collections")} variant="bordered">Continue Shopping</Button>
            </div>
        </div>
    );
};

export { CheckoutStatus, checkoutStatusLoader };
