const storeRoutes = (queryClient: any) => {
    return [
        {
            index: true,
            path: "tags",
            async lazy() {
                const { Tags, tagsLoader } = await import("@/pages/admin/store/tags");
                return {
                    loader: tagsLoader(queryClient),
                    Component: Tags,
                };
            },
        },
        {
            path: "products",
            async lazy() {
                const { Products, productsLoader } = await import("@/pages/admin/store/products");
                return {
                    loader: productsLoader(queryClient),
                    Component: Products,
                };
            },
        },
    ];
};

export { storeRoutes };
