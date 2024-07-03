const buildUrl = (baseUrl: string, queryParams: Record<string, string | number | Date | undefined | null>): string => {
    let url = baseUrl;
    let firstQueryParam = true;

    for (const key in queryParams) {
        if (!queryParams[key]) continue;
        // eslint-disable-next-line no-prototype-builtins
        if (queryParams.hasOwnProperty(key)) {
            if (firstQueryParam) {
                url += `?${key}=${queryParams[key]}`;
                firstQueryParam = false;
            } else {
                url += `&${key}=${queryParams[key]}`;
            }
        }
    }

    return url;
};

const currency = (number: number): string => {
    return number.toLocaleString("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
};

const imgSrc = (image: string): string => {
    return `${import.meta.env.VITE_IMAGE_URL}/${image}?alt=media`;
};

const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export { imgSrc, capitalize, currency, buildUrl };
