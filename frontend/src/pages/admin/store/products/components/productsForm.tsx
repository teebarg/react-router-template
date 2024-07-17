import React, { forwardRef, useImperativeHandle } from "react";
import { useRevalidator } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import useNotifications from "@/store/notifications";
import { Input, Number, Select, Switch, TextArea } from "nextui-hook-form";
import type { Generic } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryParams } from "@/hooks/use-query-params";
import productService from "@/services/product.service";
import { imgSrc } from "@/utils/util";
import { ImageUpload } from "@/components/core/ImageUpload";

type Inputs = {
    name: string;
    is_active: boolean;
    tags: Set<number | string>;
    collections: Set<number | string>;
    price: number;
    old_price: number;
    description: string;
};

interface Props {
    current?: any;
    type?: "create" | "update";
    tags?: { id: number; name: string }[];
    collections?: { id: number; name: string }[];
    onClose?: () => void;
}

interface ChildRef {
    submit: () => void;
}

const ProductForm = forwardRef<ChildRef, Props>(
    ({ type = "create", onClose, current = { name: "", is_active: true }, tags = [], collections = [] }, ref) => {
        const revalidator = useRevalidator();
        const queryClient = useQueryClient();
        const { name = "", page = "" } = useQueryParams();

        const [, notify] = useNotifications();
        const isCreate = type === "create";

        const selectedTags = current?.tags?.map((item: any) => item.id) ?? [];
        const selectedCollections = current?.collections?.map((item: any) => item.id) ?? [];

        useImperativeHandle(ref, () => ({
            submit: () => handleSubmit(onSubmit),
        }));

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
                return { value: item.id, label: item.name };
            });
        }, collections);

        const tagOptions = React.useMemo(() => {
            return tags.map((item) => {
                return { value: item.id, label: item.name };
            });
        }, tags);

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
                old_price: current.old_price ?? 0,
                collections: new Set(selectedCollections),
                tags: new Set(selectedTags),
                description: current.description,
            },
        });

        const onSubmit: SubmitHandler<Inputs> = async (data) => {
            const { collections, tags, ...body }: any = data;
            body["tags"] = [...tags];
            body["collections"] = [...collections];

            if (isCreate) {
                createMutation.mutate(body);
            } else {
                updateMutation.mutate(body);
            }
        };

        const handleUpload = async (data: any) => {
            try {
                await productService.imageUpload(current.id, data);
                queryClient.removeQueries({ queryKey: ["products", { name, page }] });
                revalidator.revalidate();
                notify.success("Imsge uploaded successfully");
            } catch (error) {
                notify.error(`${error}`);
            }
        };
        return (
            <React.Fragment>
                <div className="mx-auto w-full pb-8">
                    <form className="h-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                            <div className="relative flex-1">
                                <div className="space-y-8 ">
                                    {/* Image uploader */}
                                    <div>
                                        <span className="block text-sm font-medium mb-1">Product Image</span>
                                        {!isCreate && (
                                            <ImageUpload onUpload={handleUpload} defaultImage={current.image ? imgSrc(current.image) : ""} />
                                        )}
                                    </div>
                                    <Input register={register} name="name" label="Name" placeholder="Ex. Gown" required error={errors?.name} />
                                    <Switch name="is_active" label="Active" control={control} />
                                    <TextArea register={register} name="description" label="Description" placeholder="Product description" />
                                    <Select
                                        name="tags"
                                        label="Tags"
                                        control={control}
                                        options={tagOptions}
                                        error={errors?.tags}
                                        description="Product Tags"
                                        selectionMode="multiple"
                                        placeholder="Select Tags"
                                    />
                                    <Select
                                        name="collections"
                                        label="Collections"
                                        control={control}
                                        options={collectionOptions}
                                        error={errors?.collections}
                                        description="Product Collections"
                                        selectionMode="multiple"
                                        placeholder="Select Collections"
                                    />
                                    <Number
                                        name="price"
                                        label="Product Price"
                                        placeholder="Ex. 2500"
                                        register={register}
                                        error={errors?.price}
                                        defaultValue={0}
                                        required
                                    />
                                    <Number
                                        name="old_price"
                                        label="Old Price"
                                        placeholder="Ex. 2500"
                                        register={register}
                                        error={errors?.price}
                                        defaultValue={0}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 justify-end py-4 px-8 space-x-2 absolute bottom-0 bg-default-50 w-full right-0 z-50">
                            <Button color="danger" onPress={onClose} variant="shadow" className="min-w-32">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                isDisabled={createMutation.isPending || updateMutation.isPending}
                                isLoading={createMutation.isPending || updateMutation.isPending}
                                variant="shadow"
                                className="min-w-32"
                            >
                                {isCreate ? "Submit" : "Update"}
                            </Button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        );
    }
);

ProductForm.displayName = "ProductForm";

export { ProductForm };
