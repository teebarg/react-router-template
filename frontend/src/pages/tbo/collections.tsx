import { BreadcrumbItem, Breadcrumbs, Button, Select, SelectItem } from "@nextui-org/react";
import React from "react";
import { CollectionsSideBar } from "./components/sidebar";
import { filters } from "./data";
import { ProductItem } from "./components/product-item";
import TBONavbar from "./components/navbar";
import Meta from "@/components/Meta";
import { ExclamationIcon, FunnelIcon } from "nui-react-icons";
import { Link, LoaderFunction, useLoaderData, useParams } from "react-router-dom";
import productService from "@/services/product.service";
import { Product } from "@/models/product";
import { PaginationComponent } from "@/components/core/pagination";

interface ComponentProps {}

const tagsQuery = (url: any, collection: string | undefined) => {
    const name = url.searchParams.get("name") ?? "";
    const page = url.searchParams.get("page") ?? "";
    const sizes = url.searchParams.get("sizes") ?? "";
    const maxPrice = url.searchParams.get("maxPrice") ?? 1;
    const minPrice = url.searchParams.get("minPrice") ?? 1;
    return {
        queryKey: ["collections-page", { name, page, collection, sizes, minPrice, maxPrice }],
        queryFn: async () => {
            return await productService.all({ name, page, collection, sizes, minPrice, maxPrice, per_page: 20 });
        },
    };
};

const collectionsLoader =
    (queryClient: any): LoaderFunction =>
    async ({ request, params }) => {
        const url = new URL(request.url);
        const query = tagsQuery(url, params.slug);
        return queryClient.ensureQueryData(query);
    };

const Collections: React.FC<ComponentProps> = () => {
    const { products, ...pagination } = useLoaderData() as any;
    const { slug } = useParams();
    return (
        <React.Fragment>
            <Meta title="Children Clothings | Collections" />
            <TBONavbar />
            <div className=" h-full w-full px-2 lg:px-24 py-4 mt-4">
                <Breadcrumbs>
                    <BreadcrumbItem>
                        <Link to={"/tbo"}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={"/tbo/collections"}>Collections</Link>
                    </BreadcrumbItem>
                    {slug && <BreadcrumbItem className="capitalize">{slug}</BreadcrumbItem>}
                </Breadcrumbs>
                <div className="flex gap-6 mt-6">
                    <CollectionsSideBar />
                    <div className="w-full flex-1 flex-col">
                        <header className="relative z-20 flex flex-col gap-2 rounded-medium bg-default-50 px-4 pb-3 pt-2 md:pt-3">
                            <div className="flex items-center gap-1 md:hidden md:gap-2">
                                <h2 className="text-large font-medium capitalize">{slug}</h2>
                                <span className="text-small text-default-400">(1240)</span>
                            </div>
                            <div className="flex items-center justify-between gap-2 ">
                                <div className="flex flex-row gap-2">
                                    <Button type="button">
                                        <FunnelIcon size={16} role="img" className="text-default-500 iconify iconify--solar" focusable="false" />
                                        Filters
                                    </Button>
                                    <div className="hidden items-center gap-1 md:flex">
                                        <h2 className="text-medium font-medium capitalize">{slug}</h2>
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
                            <div className="block rounded-medium border-medium border-dashed border-divider px-2 py-4 min-h-[50vh]">
                                {products.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-content1">
                                        <div className="max-w-md mx-auto text-center">
                                            <ExclamationIcon className="w-20 h-20 mx-auto text-danger" />
                                            <h1 className="text-4xl font-bold mt-6">Oops! No Products Found</h1>
                                            <p className="text-default-500 mt-4">{`There are no products in this category`}</p>
                                            <Link to="/tbo" className="bg-primary text-white font-semibold py-2 px-4 rounded mt-6 inline-block">
                                                Go to Home
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        <div className="grid w-full gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4">
                                            {products.map((product: Product, index: number) => (
                                                <ProductItem key={index} product={product} />
                                            ))}
                                        </div>
                                        {pagination.total_pages > 1 && <PaginationComponent pagination={pagination} />}
                                    </React.Fragment>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Collections, collectionsLoader };
