import React, { useState } from "react";
import { useRevalidator } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import useNotifications from "@/store/notifications";
import { Password, Email, Input, Switch } from "nextui-hook-form";
import userService from "@/services/user.service";
import type { User } from "@/types";

type Inputs = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    is_active: boolean;
    is_superuser: boolean;
};

interface Props {
    currentUser?: User;
    type?: "create" | "update";
    onClose?: () => void;
}

const UserForm: React.FC<Props> = ({ type = "create", onClose, currentUser }) => {
    const revalidator = useRevalidator();
    const [isPending, setIsPending] = useState<boolean>(false);

    const [, notify] = useNotifications();
    const isCreate = type === "create";

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: currentUser });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsPending(true);
        const body = data;
        try {
            if (isCreate) {
                await userService.createUser(body);
                onClose?.();
            } else {
                if (!currentUser?.id) {
                    return;
                }
                await userService.updateUser(body, currentUser.id);
            }

            if (isCreate) {
                reset();
            }
            revalidator.revalidate();
            notify.success(`User ${isCreate ? "created" : "updated"} successfully`);
        } catch (error) {
            notify.error(`An error occurred: ${error}`);
        } finally {
            setIsPending(false);
        }
    };
    return (
        <React.Fragment>
            <div className="mx-auto w-full px-4 pb-8">
                <div>
                    <h2 className="mt-6 text-xl font-semibold tracking-tight">{type == "create" ? "Create" : "Update"} User</h2>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <Input register={register} name="firstname" label="FirstName" required error={errors?.firstname} />
                        <Input register={register} name="lastname" label="LastName" required error={errors?.lastname} />
                        <Email register={register} name="email" label="Email" required error={errors?.email} />
                        {isCreate && (
                            <Password name="password" label="Password" register={register} error={errors?.password} required="Password is required" />
                        )}
                        <div className="block">
                            <Switch name="is_active" label="Active" control={control} />
                        </div>
                        <div className="block">
                            <Switch name="is_superuser" label="Admin" control={control} />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button color="danger" variant="shadow" onPress={onClose} className="min-w-32">
                                Close
                            </Button>
                            <div>
                                {isPending ? (
                                    <Button color="primary" isLoading variant="shadow" isDisabled className="min-w-32">
                                        Logging in...
                                    </Button>
                                ) : (
                                    <Button color="primary" variant="shadow" type="submit" className="min-w-32">
                                        {isCreate ? "Create" : "Update"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export { UserForm };
