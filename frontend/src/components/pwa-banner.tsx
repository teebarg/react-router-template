import React from "react";
import { RightArrowIcon } from "nui-react-icons";
import { Button } from "@nextui-org/react";

export interface ThemeSwitchProps {
    onClick: () => void;
}
const PwaBanner: React.FC<ThemeSwitchProps> = ({ onClick }) => {
    return (
        <div className="flex w-full items-center justify-center gap-x-3 py-2 border-b">
            <div className="text-small flex items-end sm:text-[0.93rem] text-foreground hover:opacity-80 transition-opacity">
                <span aria-label="rocket" className="hidden md:block" role="img">
                    🚀
                </span>
                <span
                    className="inline-flex md:ml-1 animate-text-gradient font-medium bg-clip-text text-transparent bg-[linear-gradient(90deg,#D6009A_0%,#8a56cc_50%,#D6009A_100%)] dark:bg-[linear-gradient(90deg,#FFEBF9_0%,#8a56cc_50%,#FFEBF9_100%)]"
                    style={{ fontSize: "inherit", backgroundSize: "200%", backgroundClip: "text" }}
                >
                    Add to Home Screen
                </span>
            </div>
            <Button onClick={onClick} className="min-w-[100px] gap-2 rounded-full p-[1px]">
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#F54180_0%,#338EF7_50%,#F54180_100%)]"></span>
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background group-hover:bg-background/70 transition-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                    Install
                    <RightArrowIcon
                        className="outline-none transition-transform group-hover:translate-x-0.5 [&amp;>path]:stroke-[2px]"
                        aria-hidden="true"
                        role="img"
                        size={16}
                    />
                </div>
            </Button>
        </div>
    );
};

export { PwaBanner };
