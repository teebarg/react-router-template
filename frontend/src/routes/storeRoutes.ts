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
    ];
};

export { storeRoutes };
