import { BreadcrumbItem, Breadcrumbs, Button, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { CollectionsSideBar } from "./components/sidebar";
import { filters, products } from "./data";
import { ProductItem } from "./components/product-item";
import TBONavbar from "./components/navbar";
import Meta from "@/components/Meta";
import { FunnelIcon } from "nui-react-icons";

interface ComponentProps {}

const Collections: React.FC<ComponentProps> = () => {
    return (
        <React.Fragment>
            <Meta title="Children Clothings | Collections" />
            <TBONavbar />
            <div className=" h-full w-full px-2 lg:px-24 py-4 mt-4">
                <Breadcrumbs>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>Collections</BreadcrumbItem>
                    <BreadcrumbItem>Shoes</BreadcrumbItem>
                </Breadcrumbs>
                <div className="flex gap-6 mt-6">
                    <CollectionsSideBar />
                    <div className="w-full flex-1 flex-col">
                        <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
                            <div className="flex items-center gap-1 md:hidden md:gap-2">
                                <h2 className="text-large font-medium">Shoes</h2>
                                <span className="text-small text-default-400">(1240)</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 ">
                                <div className="flex flex-row gap-2">
                                    <Button type="button">
                                        <FunnelIcon size={16} role="img" className="text-default-500 iconify iconify--solar" focusable="false" />
                                        Filters
                                    </Button>
                                    <div className="hidden items-center gap-1 md:flex">
                                        <h2 className="text-medium font-medium">Shoes</h2>
                                        <span className="text-small text-default-400">(1240)</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 flex-1 sm:flex-initial">
                                    <label htmlFor="filter" className="hidden sm:block">
                                        Sort by
                                    </label>
                                    <Select id="filter" placeholder="Filter products" className="min-w-[15rem] max-w-xs flex-1">
                                        {filters.map((filter) => (
                                            <SelectItem key={filter.key}>{filter.label}</SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </header>
                        <main className="mt-4 h-full w-full overflow-visible px-1">
                            <div className="block rounded-medium border-medium border-dashed border-divider p-2">
                                <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {products.map((product, index) => (
                                        <ProductItem key={index} product={product} />
                                    ))}
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Collections };
