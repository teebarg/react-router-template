import Meta from "@/components/Meta";
import React from "react";

interface Props {}

const SandBox: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Meta title="SandBox" />
            <div className="p-8">Sandbox</div>
        </React.Fragment>
    );
};

export default SandBox;
