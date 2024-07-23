import React from "react";
import { Outlet } from "react-router-dom";

interface Props {}

const StoreLayout: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Outlet />
        </React.Fragment>
    );
};

export { StoreLayout };
