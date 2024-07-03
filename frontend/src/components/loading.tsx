import React from "react";

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-background via-content2 to-content4">
            <div className="text-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Loading...</h1>
                <p className="mt-4 text-lg font-medium">Please wait while we prepare the content for you.</p>
            </div>
        </div>
    );
};

export default LoadingPage;
