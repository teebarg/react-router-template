"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { Email, Input, TextArea, CheckBox } from "nextui-hook-form";
import baseService from "@/services/base.service";
import useNotifications from "@/store/notifications";

type Inputs = {
    name: string;
    email: string;
    phone: string;
    message: string;
    agreement: boolean;
};

const inputClass = {
    inputWrapper: "!bg-white/70 hover:!bg-white/50 focus:!bg-white/50 !text-blue-700",
    label: "!text-black/60 font-semibold text-lg",
    description: "text-black/30 font-medium",
    input: "focus:!bg-transparent !text-gray-600 !bg-transparent",
    innerWrapper: "focus:!bg-white/50",
    base: "focus:!bg-red-500",
};

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [, notify] = useNotifications();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (loading) {
            return;
        }
        const { agreement, ...payload } = data;
        if (!agreement) {
            notify.error("You must agree to submit form");
            return;
        }

        try {
            setLoading(true);
            const res = await baseService.sendContactMessage(payload);
            notify.success(res.message);
        } catch (error: any) {
            notify.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 space-y-4">
                <Input
                    name="name"
                    label="Name"
                    placeholder="Ex. John....."
                    register={register}
                    error={errors?.name}
                    required
                    classNames={inputClass}
                />
                <Email
                    name="email"
                    label="Email"
                    placeholder="Ex. email@email.com"
                    register={register}
                    error={errors.email}
                    required
                    classNames={inputClass}
                />

                <Input
                    name="phone"
                    label="Phone"
                    placeholder="Ex. 09000000000"
                    register={register}
                    error={errors.phone}
                    rules={{ minLength: 11, maxLength: 11 }}
                    classNames={inputClass}
                />

                <TextArea
                    name="message"
                    label="Message"
                    placeholder="Ex. I want to make an enquiry about..."
                    description="Your message to us"
                    register={register}
                    error={errors?.name}
                    required
                    classNames={inputClass}
                />

                <div className="flex gap-4">
                    <CheckBox name="agreement" register={register} control={control} required />
                    <p className="text-gray-700">I allow this website to store my submission so they can respond to my inquiry.</p>
                </div>

                <div>
                    {loading ? (
                        <Button color="primary" isLoading fullWidth>
                            Loading
                        </Button>
                    ) : (
                        <Button color="primary" variant="shadow" fullWidth type="submit">
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </form>
    );
}
