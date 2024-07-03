import React from "react";
import { Avatar, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { Input, TextArea } from "nextui-hook-form";

interface Props {}

type Inputs = {
    title: string;
    location: string;
};

const AdminProfile: React.FC<Props> = () => {
    const {
        register,
        formState: { errors },
    } = useForm<Inputs>();
    return (
        <React.Fragment>
            <div className="py-2">
                <div>
                    <p className="text-base font-medium text-default-700">Profile</p>
                    <p className="mt-1 text-sm font-normal text-default-400">This displays your public profile on the site.</p>
                    <div className="text-foreground rounded-large mt-4 bg-default-100">
                        <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
                            <div className="flex items-center gap-4">
                                <div className="relative inline-flex shrink-0">
                                    <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-16 h-16 text-large" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-default-600">Kate Moore</p>
                                    <p className="text-xs text-default-400">Customer Support</p>
                                    <p className="mt-1 text-xs text-default-400">kate.moore@acme.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Title</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Set your current role.</p>
                    <Input name="title" label="" register={register} error={errors?.title} placeholder="e.g Customer Support" />
                </div>
                <span aria-hidden="true" className="w-px h-2 block" style={{ marginLeft: "0.25rem", marginTop: "0.5rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Location</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Set your current location.</p>
                    <Input name="location" register={register} error={errors?.location} placeholder="e.g Buenos Aires, Argentina" />
                </div>
                <span aria-hidden="true" className="w-px h-2 block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <div>
                    <p className="text-base font-medium text-default-700">Biography</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Specify your present whereabouts.</p>
                    <TextArea
                        name="biography"
                        register={register}
                        placeholder="e.g., 'Kate Moore - Acme.com Support Specialist. Passionate about solving tech issues, loves hiking and volunteering."
                    />
                </div>
                <Button className="px-3 min-w-16 h-8 text-tiny rounded-small mt-4 bg-default-foreground text-background">Update Profile</Button>
            </div>
        </React.Fragment>
    );
};

export default AdminProfile;
