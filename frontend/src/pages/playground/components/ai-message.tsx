import React, { ReactNode } from "react";
import { Avatar, Button } from "@nextui-org/react";
import { CopyIcon, ThumbsUpIcon, ThumbsDownIcon, EmojiIcon } from "nui-react-icons";

interface Props {
    children: string | ReactNode;
}

const AiMessage: React.FC<Props> = ({ children }) => {
    return (
        <React.Fragment>
            <div className="flex gap-3">
                <div className="relative flex-none">
                    <Avatar isBordered color="secondary" src="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/avatar_ai.png" />
                </div>
                <div className="flex w-full flex-col gap-4">
                    <div className="relative w-full rounded-medium bg-content2 px-4 py-3 text-default-600">
                        <div className="pr-20 text-small">{children}</div>
                        <div className="absolute right-2 top-2 flex rounded-full bg-content2 shadow-small">
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <CopyIcon role="img" className="text-lg text-default-600" />
                            </Button>
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <ThumbsUpIcon role="img" className="text-lg text-default-600" />
                            </Button>
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <ThumbsDownIcon role="img" className="text-lg text-default-600" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between rounded-medium border-small border-default-100 px-4 py-3 shadow-small">
                        <p className="text-small text-default-600">Was this response better or worse?</p>
                        <div className="flex gap-1">
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <ThumbsUpIcon role="img" className="text-lg text-default-600" />
                            </Button>
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <ThumbsDownIcon role="img" className="text-lg text-default-600" />
                            </Button>
                            <Button className="text-tiny rounded-full px-0 !gap-0 bg-transparent data-[hover=true]:bg-default/40 min-w-8 w-8 h-8">
                                <EmojiIcon role="img" className="text-lg text-default-600" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { AiMessage };
