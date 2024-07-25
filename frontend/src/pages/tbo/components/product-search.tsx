import React from "react";
import { Autocomplete, AutocompleteItem, Image } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { SearchIcon } from "nui-react-icons";
import { currency, imgSrc } from "@/utils/util";
import { Product } from "@/models/product";
import { Link } from "react-router-dom";
import { Ratings } from "@/components/core/ratings";

interface ComponentProps {}

const Search: React.FC<ComponentProps> = () => {
    const API_URL = import.meta.env.VITE_API_DOMAIN;
    const list = useAsyncList<Product>({
        async load({ signal, filterText }) {
            const res = await fetch(`${API_URL}/product/?name=${filterText}&per_page=5`, {
                signal,
                headers: { accept: "application/json" },
            });
            const json = await res.json();
            return {
                items: json.products,
            };
        },
    });

    return (
        <Autocomplete
            inputValue={list.filterText}
            isLoading={list.isLoading}
            items={list.items}
            placeholder="Type to search..."
            variant="bordered"
            onInputChange={list.setFilterText}
            classNames={{
                base: "w-[450px]",
                listboxWrapper: "max-h-[320px]",
                selectorButton: "text-default-500",
            }}
            inputProps={{
                classNames: {
                    input: "ml-1",
                    inputWrapper: "h-[48px]",
                },
            }}
            listboxProps={{
                hideSelectedIcon: true,
                itemClasses: {
                    base: [
                        "rounded-medium",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[hover=true]:bg-default-200",
                        "data-[selectable=true]:focus:bg-default-100",
                        "data-[focus-visible=true]:ring-default-500",
                    ],
                },
            }}
            popoverProps={{
                offset: 10,
                classNames: {
                    base: "rounded-large",
                    content: "p-1 border-small border-default-100 bg-background",
                },
            }}
            startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
            radius="full"
        >
            {(item) => (
                <AutocompleteItem key={item.name} className="capitalize">
                    <Link to={`/tbo/product/${item.slug}`} className="flex items-center w-full gap-2">
                        <Image src={imgSrc(`products%2F${item.image}`)} className="h-24" />
                        <div className="flex-1">
                            <p className="truncate font-semibold">{item.name}</p>
                            <p>
                                <span className="text-danger text-lg">{currency(item.price)}</span>
                                <span className="line-through text-xs ml-1">{currency(item.old_price)}</span>
                            </p>
                            <Ratings rating={item.rating ?? 1} size={20} />
                        </div>
                        <p>Buy Now</p>
                    </Link>
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
};

export { Search };
