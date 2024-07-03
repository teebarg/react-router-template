import React from "react";

interface Props {}
const Product: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <div className="mt-4">
                <iframe
                    src="https://template.niyi.com.ng/product/7"
                    title="Product Page"
                    style={{ minHeight: "80vh", height: "100%" }}
                    allowFullScreen
                    className="w-full"
                ></iframe>
            </div>
        </React.Fragment>
    );
};

export { Product };
