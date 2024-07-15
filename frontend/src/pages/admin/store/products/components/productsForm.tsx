import React from "react";
import { useRevalidator } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import useNotifications from "@/store/notifications";
import { Input, Number, Select, Switch } from "nextui-hook-form";
import type { Generic } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";
import productService from "@/services/product.service";

type Inputs = {
    name: string;
    is_active: boolean;
    tags: string;
    collections: string;
    price: number;
};

interface Props {
    current?: any;
    type?: "create" | "update";
    // tags?: { value: string | number; label: string }[];
    tags?: any[];
    // collections?: { value: string | number; label: string }[];
    collections?: any[];
    onClose?: () => void;
}

const ProductForm: React.FC<Props> = ({ type = "create", onClose, current = { name: "", is_active: true }, tags = [], collections = [] }) => {
    const revalidator = useRevalidator();
    const queryClient = useQueryClient();
    const { name = "", page = "" } = useQueryParams();

    const [, notify] = useNotifications();
    const isCreate = type === "create";

    const selectedTags = current?.tags?.map((item: any) => item.id) ?? [];
    const selectedCollections = current?.collections?.map((item: any) => item.id) ?? [];

    // Mutations
    const createMutation = useMutation({
        mutationFn: productService.create,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["products"] });
            revalidator.revalidate();
            notify.success("products created successfully");
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
            return productService.update(body, current.id);
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["products", { name, page }] });
            revalidator.revalidate();
            notify.success("products updated successfully");
        },
        onError(error) {
            notify.error(JSON.parse(error.message)?.detail);
        },
    });

    const collectionOptions = React.useMemo(() => {
        return collections.map((item) => {
            return { id: item.id, value: item.id, label: item.name };
        });
    }, collections);

    const tagOptions = React.useMemo(() => {
        return tags.map((item) => {
            return { id: item.id, value: item.id, label: item.name };
        });
    }, tags);
    console.log(tagOptions);

    console.log(collectionOptions);

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            name: current.name,
            is_active: current.is_active,
            price: current.price ?? 0,
            collections: selectedCollections.join(","),
            tags: selectedTags.join(","),
        },
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const body = data;
        console.log("🚀 ~ constonSubmit:SubmitHandler<Inputs>= ~ body:", body);
        const tags = data.tags
            ?.split(",")
            ?.filter((i) => i)
            .map((item: string) => item);
        const collections = data.collections
            ?.split(",")
            ?.filter((i) => i)
            .map((item: string) => item);

        console.log(tags);
        console.log(collections);
        // if (isCreate) {
        //     createMutation.mutate(body);
        // } else {
        //     updateMutation.mutate(body);
        // }
    };
    return (
        <React.Fragment>
            <div className="mx-auto w-full pb-8">
                <div className="mt-8">
                    <form className="h-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                            <div className="relative flex-1">
                                <div className="space-y-8 max-w-sm mt-4">
                                    {/* Image uploader */}
                                    {/* <div>
                                        <span className="block text-sm font-medium">Product Image</span>
                                        {!isCreate && <ImageUpload onData={setFile} defaultImage={product.image ? imgSrc(product.image) : ""} />}
                                        {file && (
                                            <Button type="button" onPress={handleUpload} color="primary" isLoading={imageLoader} className="mt-1">
                                                Update Image
                                            </Button>
                                        )}
                                    </div> */}
                                    <Input register={register} name="name" label="Name" placeholder="Ex. Gown" required error={errors?.name} />
                                    <Switch name="is_active" label="Active" control={control} />
                                    <Select
                                        name="tags"
                                        label="Tags"
                                        control={control}
                                        options={[
                                            { key: "cat", label: "Cat" },
                                            { key: "dog", label: "Dog" },
                                        ]}
                                        error={errors?.tags}
                                        description="Product Tags"
                                        selectionMode="multiple"
                                        placeholder="Select Tags"
                                    />
                                    {/* <Select
                                        name="collections"
                                        label="Collections"
                                        control={control}
                                        options={tagOptions}
                                        error={errors?.collections}
                                        description="Product Collections"
                                        selectionMode="multiple"
                                        placeholder="Select Collections"
                                    /> */}
                                    <Number
                                        name="price"
                                        label="Product Price"
                                        placeholder="Ex. 2500"
                                        register={register}
                                        error={errors?.price}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 justify-end p-4 space-x-2 border-t border-default-200">
                            <Button color="danger" onPress={onClose} variant="shadow">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                isDisabled={createMutation.isPending || updateMutation.isPending}
                                isLoading={createMutation.isPending || updateMutation.isPending}
                                variant="shadow"
                            >
                                {isCreate ? "Submit" : "Update"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export { ProductForm };
