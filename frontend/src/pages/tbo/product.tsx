import { Ratings } from "@/components/core/ratings";
import productService from "@/services/product.service";
import { currency, imgSrc } from "@/utils/util";
import { Accordion, AccordionItem, BreadcrumbItem, Breadcrumbs, Button, ScrollShadow, Image } from "@nextui-org/react";
import { StarIcon } from "nui-react-icons";
import React from "react";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";

interface Props {}

const productQuery = (slug: string) => {
    return {
        queryKey: ["product-page", { slug }],
        queryFn: async () => {
            return await productService.getProduct(slug);
        },
    };
};

const productLoader =
    (queryClient: any): LoaderFunction =>
    async ({ params }) => {
        const query = productQuery(params.slug ?? "");
        return queryClient.ensureQueryData(query);
    };

const Product: React.FC<Props> = () => {
    const product = useLoaderData() as any;
    return (
        <React.Fragment>
            {/* <div className="mt-4">
                <iframe
                    src="https://template.niyi.com.ng/product/7"
                    title="Product Page"
                    style={{ minHeight: "80vh", height: "100%" }}
                    allowFullScreen
                    className="w-full"
                ></iframe>
            </div> */}
            <div className="max-w-8xl h-full w-full px-2 lg:px-24 my-8">
                <Breadcrumbs>
                    <BreadcrumbItem>
                        <Link to={"/tbo"}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={"/tbo/collections"}>Collections</Link>
                    </BreadcrumbItem>
                    {product.name && <BreadcrumbItem className="capitalize">{product.name}</BreadcrumbItem>}
                </Breadcrumbs>
                <div className="relative flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mt-4">
                    <div className="relative h-full w-full flex-none">
                        <div className="inline-flex items-center justify-between px-2 text-medium rounded-full absolute left-3 top-3 z-20 h-10 gap-1 bg-background/60 pl-3 pr-2 text-foreground/90 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                            <StarIcon className="max-h-[80%]" role="img" width="1em" height="1em" />
                            <span className="flex-1 text-inherit font-normal px-2 pl-1">Popular</span>
                        </div>
                        <Image
                            src={imgSrc(`products%2F${product.image}`)}
                            className="max-h-[60vh]"
                            classNames={{ wrapper: "!max-w-full flex justify-center" }}
                            alt={product.name}
                        />
                        <ScrollShadow orientation="horizontal" className="h-[200px] w-full">
                            <Image src={imgSrc(`products%2F${product.image}`)} className="h-[200px] w-full" alt={product.name} />
                        </ScrollShadow>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                        <h2 className="sr-only">Product information</h2>
                        <div className="my-2 flex items-center gap-2">
                            <div className="flex items-center gap-3">
                                <Ratings rating={product.ratings} />
                            </div>
                            <p className="text-small text-default-400">669 reviews</p>
                        </div>
                        <p className="text-xl font-medium tracking-tight">{currency(product.price)}</p>
                        <div className="mt-4">
                            <p className="sr-only">Product description</p>
                            <p className="line-clamp-3 text-medium text-default-500">
                                {product.description}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-1">
                            <div className="mb-4 flex items-center gap-2 text-default-700">
                                <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M4 16h12v2H4zm-2-5h10v2H2z" />
                                    <path
                                        fill="currentColor"
                                        d="m29.919 16.606l-3-7A1 1 0 0 0 26 9h-3V7a1 1 0 0 0-1-1H6v2h15v12.556A4 4 0 0 0 19.142 23h-6.284a4 4 0 1 0 0 2h6.284a3.98 3.98 0 0 0 7.716 0H29a1 1 0 0 0 1-1v-7a1 1 0 0 0-.081-.394M9 26a2 2 0 1 1 2-2a2 2 0 0 1-2 2m14-15h2.34l2.144 5H23Zm0 15a2 2 0 1 1 2-2a2 2 0 0 1-2 2m5-3h-1.142A3.995 3.995 0 0 0 23 20v-2h5Z"
                                    />
                                </svg>
                                <p className="text-small font-medium">Free shipping and 30 days return</p>
                            </div>
                            <Link
                                to={"/tbo"}
                                className="inline-flex items-center text-small hover:opacity-80 transition-opacity my-2 text-default-400"
                            >
                                See guide
                                <svg aria-hidden="true" role="img" className="[&>path]:stroke-[2px]" width="1em" height="1em" viewBox="0 0 24 24">
                                    <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M6 18L18 6m0 0H9m9 0v9"
                                    />
                                </svg>
                            </Link>
                        </div>
                        <Accordion className="px-0">
                            <AccordionItem key="1" aria-label="Size & Fit" title="Size & Fit">
                                <ul className="list-inside list-disc">
                                    <li className="text-default-500">Fits small; we recommend ordering a half size up</li>
                                    <li className="text-default-500">Mid-weight, non-stretchy fabric</li>
                                    <li className="text-default-500">Designed for a mini length</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem key="2" aria-label="Shipping & Returns" title="Shipping & Returns">
                                <ul className="list-inside list-disc">
                                    <li className="text-default-500">Free shipping & returns</li>
                                    <li className="text-default-500">Free, no-hassle returns</li>
                                    <li className="text-default-500">Complimentary gift packaging</li>
                                    <li className="text-default-500">Ships within 24 hours!</li>
                                </ul>
                            </AccordionItem>
                            <AccordionItem key="3" aria-label="Designer Notes" title="Designer Notes">
                                <ul className="list-inside list-disc">
                                    <li className="text-default-500">Fits small; we recommend ordering a half size up</li>
                                    <li className="text-default-500">Mid-weight, non-stretchy fabric</li>
                                    <li className="text-default-500">Designed for a mini length</li>
                                </ul>
                            </AccordionItem>
                        </Accordion>
                        <div className="mt-2 flex gap-2">
                            <Button variant="shadow" color="primary">
                                <svg aria-hidden="true" role="img" focusable="false" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M2.237 2.288a.75.75 0 1 0-.474 1.423l.265.089c.676.225 1.124.376 1.453.529c.312.145.447.262.533.382c.087.12.155.284.194.626c.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.982 2.26c.601.602 1.36.86 2.26.981c.866.117 1.969.117 3.336.117H18a.75.75 0 0 0 0-1.5h-7c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556c-.235-.235-.4-.551-.506-1.091h10.12c.959 0 1.438 0 1.814-.248c.376-.248.565-.688.943-1.57l.428-1c.81-1.89 1.215-2.834.77-3.508C19.533 6 18.506 6 16.45 6H5.745a8.996 8.996 0 0 0-.047-.833c-.055-.485-.176-.93-.467-1.333c-.291-.404-.675-.66-1.117-.865c-.417-.194-.946-.37-1.572-.58zM7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
                                    />
                                </svg>
                                Add to cart
                            </Button>
                            <Button isIconOnly>
                                <svg aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="m8.962 18.91l.464-.588zM12 5.5l-.54.52a.75.75 0 0 0 1.08 0zm3.038 13.41l.465.59zm-5.612-.588C7.91 17.127 6.253 15.96 4.938 14.48C3.65 13.028 2.75 11.335 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339c1.43 1.61 3.254 2.9 4.68 4.024zM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713c1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06C2.786 4.073 1.25 6.425 1.25 9.137zM8.497 19.5c.513.404 1.063.834 1.62 1.16c.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385c-.453-.264-.922-.628-1.448-1.043zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024c1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.198-.9 3.891-2.188 5.343c-1.315 1.48-2.972 2.647-4.488 3.842zM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077c-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596c1.659.759 2.874 2.562 2.874 4.713zm-8.176 9.185c-.526.415-.995.779-1.448 1.043c-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59c.558-.326 1.107-.756 1.62-1.16z"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { Product, productLoader };
