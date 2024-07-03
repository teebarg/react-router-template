import React from "react";

interface DynamicComponentProps {
    componentName: string;
    path?: string;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({ componentName, path = "@/components", ...props }) => {
    const loadComponent = () => import(path).then((module) => ({ default: module[componentName] }));

    const DynamicComponentLoader = React.lazy(loadComponent);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <DynamicComponentLoader {...props} />
        </React.Suspense>
    );
};

export default DynamicComponent;
