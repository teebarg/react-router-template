import { Progress } from "@nextui-org/react";
import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "./footer";
import { Banner } from "./banner";

interface Props {}

const Layout: React.FC<Props> = () => {
    const { state } = useNavigation();

    return (
        <React.Fragment>
            {state === "loading" && <Progress size="sm" isIndeterminate aria-label="Loading..." className="" color="secondary" />}
            <Banner />
            <Outlet />
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
