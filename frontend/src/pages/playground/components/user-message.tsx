import React, { ReactNode } from "react";
import { Avatar } from "@nextui-org/react";

interface Props {
    children: string | ReactNode;
}

const UserMessage: React.FC<Props> = ({ children }) => {
    return (
        <React.Fragment>
            <div className="flex gap-3">
                <div className="relative flex-none">
                    <Avatar isBordered color="primary" src="https://d2u8k2ocievbld.cloudfront.net/memojis/male/6.png" />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <div className="relative w-full rounded-medium px-4 py-3 bg-content3 text-content3-foreground">
                        <div className="pr-20 text-small">{children}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { UserMessage };
