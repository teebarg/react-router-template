import { CancelIcon, DocumentIcon, MasterCardIcon, PayPalIcon, VisaCardIcon } from "nui-react-icons";
import { BreadcrumbItem, Breadcrumbs, Button, Checkbox, Radio, RadioGroup, cn, Image } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Email, Input, Select, Number } from "nextui-hook-form";
import { useCart } from "@/store/cart-provider";
import { CartItem } from "@/models/commerce";
import { currency, imgSrc } from "@/utils/util";
import Meta from "@/components/Meta";
import orderService from "@/services/order.service";
import useNotifications from "@/store/notifications";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomRadio: React.FC<any> = (props) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                ),
            }}
        >
            {children}
        </Radio>
    );
};

type Inputs = {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
};

interface ComponentProps {}

const Checkout: React.FC<ComponentProps> = () => {
    const [, notify] = useNotifications();
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();
    const [loading, setLoading] = React.useState<boolean>(false);
    const subTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const tax = 0.05 * subTotal;
    const discount = 2000;
    const total_amount = subTotal + tax + discount;
    const delivery_fee = 1500;

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const { order_number } = await orderService.create({
                shipping_id: 1,
                subtotal: subTotal,
                tax,
                delivery_fee,
                discount,
                total_amount,
            });
            navigate(`/tbo/checkout/${order_number}`, { replace: true });
        } catch (error) {
            notify.error(`${error}`);
        } finally {
            setLoading(false);
        }
    };

    const {
        control,
        register,
        formState: { errors },
    } = useForm<Inputs>();
    return (
        <div>
            <Meta title={`Clothings | TBO Store`} />
            <div className="relative flex min-h-dvh flex-col bg-background bg-radial pt-16" id="app-container">
                <div className="flex items-center justify-center p-4">
                    <section className="flex w-full max-w-6xl flex-col lg:flex-row lg:gap-8">
                        <div className="w-full">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-2xl font-medium">Shopping Cart</h1>
                                <Breadcrumbs>
                                    <BreadcrumbItem>
                                        <NavLink to={"/tbo"}>Home</NavLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>
                                        <NavLink to={"/tbo/collections"}>Collections</NavLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbItem>My Shopping Cart</BreadcrumbItem>
                                </Breadcrumbs>
                            </div>
                            <form className="flex flex-col gap-4 py-8">
                                <div className="flex flex-col gap-4">
                                    <span className="relative text-foreground-500">Shipping Information</span>
                                    <Email name="email" label="Email address" register={register} error={errors?.email} required />
                                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                                        <Input name="firstname" label="First name" register={register} error={errors?.firstname} required />
                                        <Input name="lastname" label="Last name" register={register} error={errors?.lastname} required />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                                        <Input name="address" label="Address" register={register} />
                                        <Input name="address2" label="Apt, suite, etc." register={register} />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                                        <Input name="city" label="City" register={register} required />
                                        <Select
                                            name="country"
                                            label="Country"
                                            register={register}
                                            required
                                            options={[]}
                                            control={control}
                                            placeholder="Select a country"
                                        />
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 sm:flex-nowrap">
                                        <Number name="postal" label="Postal code" register={register} />
                                        <Number name="phone" label="Phone number" register={register} />
                                    </div>
                                </div>
                                <RadioGroup
                                    label="Address type"
                                    color="warning"
                                    orientation="horizontal"
                                    className="mt-4"
                                    classNames={{ wrapper: "gap-8" }}
                                    defaultValue="home"
                                >
                                    <Radio value="home" description="All Day Delivery">
                                        Home
                                    </Radio>
                                    <Radio value="office" description="Delivery Between 9AM - 6PM">
                                        Office
                                    </Radio>
                                </RadioGroup>
                                <RadioGroup
                                    label="Payment"
                                    description="Selected plan can be changed at any time."
                                    orientation="horizontal"
                                    className="mt-4"
                                    classNames={{ wrapper: "gap-4" }}
                                    defaultValue="master"
                                >
                                    <CustomRadio value="visa">
                                        <div className="flex w-full items-center gap-3">
                                            <VisaCardIcon />
                                            <div className="flex w-full flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-small">1234 ****</p>
                                                </div>
                                                <p className="text-tiny text-default-400">Exp. on 02/2025</p>
                                            </div>
                                        </div>
                                    </CustomRadio>
                                    <CustomRadio value="master">
                                        <div className="flex w-full items-center gap-2">
                                            <MasterCardIcon />
                                            <div className="flex w-full flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-small">8888 ****</p>
                                                </div>
                                                <p className="text-tiny text-default-400">Exp. on 02/2025</p>
                                            </div>
                                        </div>
                                    </CustomRadio>
                                    <CustomRadio value="paypal">
                                        <div className="flex w-full items-center gap-3">
                                            <PayPalIcon />
                                            <div className="flex w-full flex-col gap-1">
                                                <div className="flex items-center gap-3">
                                                    <p className="text-small">PayPal</p>
                                                </div>
                                                <p className="text-tiny text-default-400">Pay with PayPal</p>
                                            </div>
                                        </div>
                                    </CustomRadio>
                                </RadioGroup>
                                <div className="flex flex-col gap-4">
                                    <Email labelPlacement="outside" name="email" label="Email address" register={register} />
                                    <Number
                                        label="Card number"
                                        placeholder="you@example.com"
                                        labelPlacement="outside"
                                        startContent={<DocumentIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    />
                                    <Input labelPlacement="outside" name="card_name" label="Cardholder name" register={register} />
                                </div>
                                <fieldset className="mt-4">
                                    <legend className="pb-2 text-foreground-500">Billing address</legend>
                                    <Checkbox defaultSelected>Same as shipping address</Checkbox>
                                </fieldset>
                            </form>
                        </div>
                        <div className="w-full rounded-medium bg-content2 px-2 py-4 dark:bg-content1 md:px-6 md:py-8 lg:w-[340px] lg:flex-none">
                            <div>
                                <h2 className="font-medium text-default-500">Your Order</h2>
                                <hr className="shrink-0 bg-divider border-none w-full h-divider mt-4" role="separator" />
                                <h3 className="sr-only">Items in your cart</h3>
                                <ul>
                                    {cartItems?.map((item: CartItem, key: number) => (
                                        <li key={key} className="flex items-center gap-x-4 border-b-small border-divider py-4">
                                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center">
                                                <div
                                                    className="relative shadow-black/5 shadow-none rounded-large"
                                                    style={{ maxWidth: "fit-content" }}
                                                >
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
                                            <Button
                                                onPress={() => removeFromCart(item.id)}
                                                isIconOnly
                                                className="rounded-full px-0 !gap-0 bg-default/40 h-7 w-7 min-w-[1.5rem]"
                                            >
                                                <CancelIcon size={14} role="img" />
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                                <div>
                                    <form className="mb-4 mt-6 flex items-end gap-2">
                                        <Input
                                            label="Coupon code"
                                            placeholder="Enter coupon code"
                                            variant="bordered"
                                            labelPlacement="outside"
                                            className="max-w-xs"
                                        />
                                        <Button className="px-4 min-w-20 h-10 text-small gap-2 bg-default" type="submit">
                                            Apply
                                        </Button>
                                    </form>
                                    <dl className="flex flex-col gap-4 py-4">
                                        <div className="flex justify-between">
                                            <dt className="text-small text-default-500">Subtotal</dt>
                                            <dd className="text-small font-semibold text-default-700">{currency(subTotal)}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-small text-default-500">Delivery</dt>
                                            <dd className="text-small font-semibold text-default-700">{currency(0)}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-small text-default-500">Tax</dt>
                                            <dd className="text-small font-semibold text-default-700">{currency(tax)}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-small text-default-500">Discount</dt>
                                            <dd className="text-small font-semibold text-success">- {currency(discount)}</dd>
                                        </div>
                                        <hr className="shrink-0 bg-divider border-none w-full h-divider" role="separator" />
                                        <div className="flex justify-between">
                                            <dt className="text-small font-semibold text-default-500">Total</dt>
                                            <dd className="text-small font-semibold text-default-700">{currency(total_amount)}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                            <div className="mt-4">
                                <Button onPress={handleCheckout} color="primary" className="w-full" isLoading={loading} isDisabled={loading}>
                                    Checkout
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export { Checkout };
