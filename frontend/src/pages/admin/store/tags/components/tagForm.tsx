import React from "react";
import { useRevalidator } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import useNotifications from "@/store/notifications";
import { Input, Switch } from "nextui-hook-form";
import type { Generic } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";
import tagService from "@/services/tag.service";

type Inputs = {
    name: string;
    is_active: boolean;
};

interface Props {
    current?: Generic;
    type?: "create" | "update";
    onClose?: () => void;
}

const TagForm: React.FC<Props> = ({ type = "create", onClose, current }) => {
    const revalidator = useRevalidator();
    const queryClient = useQueryClient();
    const { name = "", page = "" } = useQueryParams();

    const [, notify] = useNotifications();
    const isCreate = type === "create";

    // Mutations
    const createMutation = useMutation({
        mutationFn: tagService.create,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["tags"] });
            revalidator.revalidate();
            notify.success("Tag created successfully");
            reset();
        },
        onError(error) {
            notify.error(JSON.parse(error.message)?.detail);
        },
    });

    const updateMutation = useMutation({
        mutationFn: async (body: Generic) => {
            if (!current?.id) {
                return;
            }
            return tagService.update(body, current.id);
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["tags", { name, page }] });
            revalidator.revalidate();
            notify.success("Tag updated successfully");
        },
        onError(error) {
            notify.error(JSON.parse(error.message)?.detail);
        },
    });

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ defaultValues: current });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const body = data;
        if (isCreate) {
            createMutation.mutate(body);
        } else {
            updateMutation.mutate(body);
        }
    };
    return (
        <React.Fragment>
            <div className="mx-auto w-full px-4 pb-8">
                <div>
                    <h2 className="mt-6 text-xl font-semibold tracking-tight">{type == "create" ? "Create" : "Update"} Tag</h2>
                </div>
                <div className="mt-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <Input register={register} name="name" label="Name" required error={errors?.name} />
                        <div className="block">
                            <Switch name="is_active" label="Active" control={control} />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button color="danger" variant="shadow" onPress={onClose} className="min-w-32">
                                Close
                            </Button>
                            <div>
                                {createMutation.isPending || updateMutation.isPending ? (
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

export { TagForm };
