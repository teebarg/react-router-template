import { CustomCheckbox } from "@/components/core/checkbox";
import { Accordion, AccordionItem, Checkbox, CheckboxGroup, Input, Slider } from "@nextui-org/react";
import React from "react";
import { brands, categories, genders, sizes } from "../data";
import { Link } from "react-router-dom";
import useWatch from "@/hooks/use-watch";
import { useUpdateQuery } from "@/hooks/useUpdateQuery";
import { useQueryParams } from "@/hooks/use-query-params";

function isInRange(number: number, range: number[]) {
    const [lowerBound, upperBound] = range;
    return number >= lowerBound && number <= upperBound;
}

interface ComponentProps {}

const CollectionsSideBar: React.FC<ComponentProps> = () => {
    const { minPrice = 0, maxPrice = 10, sizes: sizesSelect = "" } = useQueryParams();
    const { updateQuery } = useUpdateQuery(1000);

    const [sizesSelected, setSizesSelected] = React.useState<string[]>(sizesSelect ? sizesSelect.split(",") : []);

    const [categoriesSelected, setCategoriesSelected] = React.useState<string[]>(["children-shoes"]);
    const [genderSelected, setGenderSelected] = React.useState<string[]>(["boys"]);
    const [brandSelected, setBrandSelected] = React.useState<string[]>(["adidas"]);

    const [priceRange, setPriceRange] = React.useState<number[]>([Number(minPrice), Number(maxPrice)]);

    useWatch(priceRange, (newValue: any) => {
        const [minPrice, maxPrice] = newValue;

        updateQuery([
            { key: "minPrice", value: minPrice },
            { key: "maxPrice", value: maxPrice },
        ]);
    });

    useWatch(sizesSelected, (newValue: any) => {
        updateQuery([{ key: "sizes", value: newValue }]);
    });

    return (
        <div className="hidden h-full max-w-[20rem] overflow-x-hidden overflow-y-scroll sm:flex max-h-[90vh] sticky top-16">
            <div className="h-full w-full max-w-sm rounded-medium p-6 bg-default-50">
                <div>
                    <label className="text-sm">Categories</label>
                    <hr className="shrink-0 border-none w-full h-divider my-3 bg-default-100" role="separator" />
                    <div className="block mb-6">
                        {[
                            { name: "Boys", slug: "boys" },
                            { name: "Girls", slug: "girls" },
                        ].map((item: any, index: number) => (
                            <Link key={index} to={`/tbo/collections/${item.slug}`} className="block text-base">
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <h2 className="text-sm font-medium text-foreground">Filter by</h2>
                <hr className="shrink-0 border-none w-full h-divider my-3 bg-default-100" role="separator" />
                <div className="overflow-y-auto -mx-6 h-full px-6 max-h-full pb-12">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div>
                                <h3 className="text-medium font-medium leading-8 text-default-600">Price Range</h3>
                                <p className="text-small text-default-400"></p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-col gap-1">
                                    <div className="flex h-12 w-full items-end justify-between px-2">
                                        {Array.from({ length: 11 }, (_, index) => index * 10).map((item: number, index: number) => (
                                            <span
                                                key={index}
                                                className="relative w-1 rounded-full bg-default-100 after:absolute after:bottom-0 after:h-0 after:w-full after:rounded-full after:bg-primary after:transition-all after:!duration-500 after:content-[''] data-[in-range=true]:after:h-full"
                                                style={{ height: `${item}%` }}
                                                data-in-range={isInRange(item, priceRange)}
                                            ></span>
                                        ))}
                                    </div>
                                    <Slider
                                        value={priceRange}
                                        onChange={(value: number | number[]) => {
                                            if (typeof value == "number") {
                                                setPriceRange([value]);
                                                return;
                                            }
                                            setPriceRange(value);
                                        }}
                                        showTooltip={false}
                                        step={10}
                                        minValue={0}
                                        maxValue={100}
                                        hideValue={true}
                                        size="sm"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Input
                                    value={priceRange[0].toString()}
                                    onValueChange={(number: string) => setPriceRange((prev: any) => [Number(number), prev[1]])}
                                    placeholder="0.00"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    type="number"
                                />
                                <hr className="shrink-0 bg-divider border-none h-divider mx-2 w-2" role="separator" />
                                <Input
                                    value={priceRange[1].toString()}
                                    onValueChange={(number: string) => setPriceRange((prev: any) => [prev[0], Number(number)])}
                                    placeholder="0.00"
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                    type="number"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <h3 className="text-medium font-medium leading-8 text-default-600">Size</h3>
                        <p className="text-small text-default-400"></p>
                    </div>
                    <div className="relative flex flex-col gap-1" aria-label="Select amenities" role="group">
                        <CheckboxGroup className="gap-1" orientation="horizontal" value={sizesSelected} onChange={setSizesSelected}>
                            {sizes.map((size, index) => (
                                <CustomCheckbox key={index} value={size}>
                                    {size}
                                </CustomCheckbox>
                            ))}
                        </CheckboxGroup>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Accordion defaultExpandedKeys={["1"]}>
                        <AccordionItem key="1" aria-label="Category" title="Category">
                            <CheckboxGroup value={categoriesSelected} onChange={setCategoriesSelected}>
                                {categories.map((item, index) => (
                                    <Checkbox key={index} value={item.slug}>
                                        {item.title}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="flex flex-col gap-3">
                    <Accordion defaultExpandedKeys={["1"]}>
                        <AccordionItem key="1" aria-label="Gender" title="Gender">
                            <CheckboxGroup defaultValue={["boys"]} value={genderSelected} onChange={setGenderSelected}>
                                {genders.map((item, index) => (
                                    <Checkbox key={index} value={item.slug}>
                                        {item.title}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="flex flex-col gap-3">
                    <Accordion defaultExpandedKeys={["1"]}>
                        <AccordionItem key="1" aria-label="Brand" title="Brand">
                            <CheckboxGroup defaultValue={["Puma"]} value={brandSelected} onChange={setBrandSelected}>
                                {brands.map((item, index) => (
                                    <Checkbox key={index} value={item.slug}>
                                        {item.title}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export { CollectionsSideBar };
