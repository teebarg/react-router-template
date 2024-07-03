import React from "react";
import { Button, Radio, RadioGroup, cn } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { MailIcon } from "nui-react-icons";
import { Input, Select } from "nextui-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "m-0 items-start group inline-flex flex-row-reverse justify-between bg-content2 hover:bg-content3 max-w-[300px]",
                    "cursor-pointer gap-4 rounded-large border-1 border-default-200 px-4 py-2.5 shadow-md relative flex-1 overflow-hidden",
                    "data-[selected=true]:border-primary"
                ),
                description: "text-foreground text-medium",
            }}
        >
            {children}
        </Radio>
    );
};

interface Props {}

type Inputs = {
    address1: string;
    address2: string;
};

const AdminBilling: React.FC<Props> = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useForm<Inputs>();
    return (
        <React.Fragment>
            <div className="py-2">
                <div>
                    <div className="rounded-large bg-default-100">
                        <div className="flex items-center justify-between gap-2 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <MailIcon className="h-6 w-6 text-default-500" />
                                <div>
                                    <p className="text-sm font-medium text-default-600">Payment method</p>
                                    <p className="text-xs text-default-400">MasterCard credit card ending in ***3456</p>
                                </div>
                            </div>
                            <Button className="bg-default-foreground text-background h-8">Update</Button>
                        </div>
                    </div>
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Current Plan</p>
                    <p className="mt-1 text-sm font-normal text-default-400">
                        Your free trial ends in <span className="text-default-500">8 days.</span>
                    </p>
                    <RadioGroup orientation="horizontal" className="mt-4" classNames={{ wrapper: "gap-4" }} defaultValue="monthly">
                        <CustomRadio value="monthly">
                            <div>
                                <span className="relative select-none text-medium transition-colors motion-reduce:transition-none text-default-500 font-medium">
                                    Pro Monthly
                                </span>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <p className="pt-2">
                                        <span className="text-[30px] font-semibold leading-7 text-default-foreground">$12</span>
                                        <span className="text-xs font-medium text-default-400">/per month</span>
                                    </p>
                                    <ul className="list-inside list-disc text-xs font-normal text-default-500">
                                        <li>Unlimited users</li>
                                        <li>All features</li>
                                        <li>Support via email and chat</li>
                                        <li>Billed monthly, cancel any time</li>
                                    </ul>
                                </div>
                            </div>
                        </CustomRadio>
                        <CustomRadio value="yearly">
                            <div>
                                <span className="relative select-none text-medium transition-colors motion-reduce:transition-none text-default-500 font-medium">
                                    Pro Yearly
                                </span>
                            </div>
                            <div>
                                <div className="mt-2">
                                    <p className="pt-2">
                                        <span className="text-[30px] font-semibold leading-7 text-default-foreground">$72</span>
                                        <span className="text-xs font-medium text-default-400">/per year</span>
                                    </p>
                                    <ul className="list-inside list-disc text-xs font-normal text-default-500">
                                        <li>Unlimited users</li>
                                        <li>All features</li>
                                        <li>Support via email and chat</li>
                                        <li>Billed monthly, cancel any time</li>
                                    </ul>
                                </div>
                            </div>
                        </CustomRadio>
                    </RadioGroup>
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <div>
                    <div>
                        <p className="text-base font-medium text-default-700">Billing Address</p>
                        <p className="mt-1 text-sm font-normal text-default-400">
                            {`If you'd like to add a postal address to every invoice, enter it here.`}
                        </p>
                    </div>
                </div>
                <div className="mt-2 space-y-2">
                    <Input name="address1" register={register} error={errors.address1} placeholder="Address Line 1" />
                    <Input name="address2" register={register} placeholder="Address Line 2" />
                    <Input name="city" register={register} placeholder="City" />
                    <div className="flex items-center gap-2">
                        <Select name="area" register={register} required options={[]} control={control} placeholder="Buenos Aires" />
                        <Input name="postal" register={register} placeholder="Postal Code" />
                    </div>
                    <Select name="country" register={register} required options={[]} control={control} placeholder="Argentina" />
                </div>
                <Button className="mt-5 bg-default-foreground text-background h-8">Save</Button>
            </div>
        </React.Fragment>
    );
};

export default AdminBilling;
