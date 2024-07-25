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
            {state === "loading" && <Progress size="sm" isIndeterminate color="secondary" />}
            <Banner />
            <div className="bg-slate-100 p-8">
                <input name="name" className="bg-white text-red-500 h-8" />
            </div>
            <Outlet />
            <Footer />
        </React.Fragment>
    );
};

export { Layout };
