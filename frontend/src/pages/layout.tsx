import { Progress } from "@nextui-org/react";
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

interface Props {}

const Layout: React.FC<Props> = () => {
    const { state } = useNavigation();

    return (
        <React.Fragment>
            {state === "loading" && <Progress size="sm" isIndeterminate aria-label="Loading..." className="" color="secondary" />}
            <Outlet />
        </React.Fragment>
    );
};

export default Layout;
