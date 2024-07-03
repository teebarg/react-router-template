import { loader as loaderDefaultOptions } from "@/config";

import asyncComponentLoader from "./loader";
import type { AnyProps, LoadComponent, LoaderDefaultOptions } from "./types";
import LoadingPage from "@/components/loading";

const configuredAsyncComponentLoader = (
    loadComponent: LoadComponent,
    additionalProps: AnyProps = {},
    loaderOptions: LoaderDefaultOptions = loaderDefaultOptions,
    FallbackWaiting = LoadingPage
) => asyncComponentLoader(loadComponent, additionalProps, loaderOptions, FallbackWaiting);

export { loaderDefaultOptions };
export default configuredAsyncComponentLoader;
