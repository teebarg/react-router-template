import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Progress } from "@nextui-org/react";

interface Props {}

const StoreLayout: React.FC<Props> = () => {
    const navigation = useNavigation();

    return (
        <React.Fragment>
            {navigation.state === "loading" && <Progress size="sm" isIndeterminate aria-label="Loading..." className="w-full" />}
            <Outlet />
        </React.Fragment>
    );
};

export { StoreLayout };
