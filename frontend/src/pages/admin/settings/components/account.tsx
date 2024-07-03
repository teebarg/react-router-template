import React from "react";
import { Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Email, Input, Select } from "nextui-hook-form";

interface Props {}

type Inputs = {
    name: string;
    username: string;
    email: string;
};

const AdminAccount: React.FC<Props> = () => {
    const {
        control,
        register,
        formState: { errors },
    } = useForm<Inputs>();
    return (
        <React.Fragment>
            <div className="py-2">
                <div>
                    <p className="text-base font-medium text-default-700">Full name</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Name to be used for emails.</p>
                    <Input name="name" register={register} error={errors?.name} placeholder="e.g Kate Moore" />
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Username</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Nickname or first name.</p>
                    <Input name="username" register={register} error={errors?.username} placeholder="kate.moore" />
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Email Address</p>
                    <p className="mt-1 text-sm font-normal text-default-400">The email address associated with your account.</p>
                    <Email name="email" type="email" register={register} error={errors?.email} placeholder="e.g kate.moore@acme.com" />
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }} />
                <div>
                    <div>
                        <p className="text-base font-medium text-default-700">Timezone</p>
                        <p className="mt-1 text-sm font-normal text-default-400">Set your current timezone.</p>
                    </div>
                    <Select
                        name="timezone"
                        register={register}
                        rules={{ required: true }}
                        options={[]}
                        control={control}
                        placeholder="West African Time (WAT)"
                        className="max-w-[15rem]"
                    />
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }} />
                <Button className="mt-4 bg-default-foreground text-background">Update Account</Button>
            </div>
        </React.Fragment>
    );
};

export default AdminAccount;
