import { useWebSocket } from "@/hooks/use-websocket";
import {
    Avatar,
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    ScrollShadow,
} from "@nextui-org/react";
import { NotificationIcon } from "nui-react-icons";
import React, { useEffect } from "react";

interface Props {}

const Notification: React.FC<Props> = () => {
    const { messages, connect, disconnect } = useWebSocket({ type: ["registration"] });
    const id = "nK12eRTbo";

    useEffect(() => {
        const domain = import.meta.env.DEV ? "ws://localhost:4010" : `wss://${import.meta.env.VITE_DOMAIN}`;
        const url = `${domain}/api/ws/${id}`;
        connect(url);
        return () => {
            disconnect();
        };
    }, []);

    return (
        <div>
            <Dropdown placement="bottom-start" classNames={{ content: "p-0" }}>
                <Badge as="button" content={messages.length} shape="circle" color="danger">
                    <DropdownTrigger>
                        <Button isIconOnly className="bg-transparent h-auto w-auto min-w-[auto]">
                            <NotificationIcon size={24} />
                        </Button>
                    </DropdownTrigger>
                </Badge>
                <DropdownMenu aria-label="Profile Actions" variant="flat" classNames={{ base: "p-0" }}>
                    <DropdownItem key="profile" className="p-0">
                        <Card className="max-w-[400px]">
                            <CardHeader className="block">
                                <div className="flex w-full items-center justify-between px-2">
                                    <div className="inline-flex items-center gap-1">
                                        <h4 className="inline-block align-middle text-large font-medium">Notifications</h4>
                                        <Chip size="sm">{messages.length}</Chip>
                                    </div>
                                    <Button className="rounded-full bg-transparent text-primary data-[hover=true]:bg-primary/20 px-3 h-8">
                                        Mark all as read
                                    </Button>
                                </div>
                            </CardHeader>
                            <Divider />
                            <CardBody className="p-0">
                                <ScrollShadow size={200} className="w-[350px] h-[300px]">
                                    {messages.map((message, index) => (
                                        <div key={index} className="flex gap-3 border-b border-divider px-6 py-4">
                                            <Avatar isBordered color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                                            <div className="flex flex-col gap-1">
                                                <p className="text-small text-foreground">
                                                    <strong className="font-medium">{message.firstname}</strong> mentioned you in a post.
                                                </p>
                                                <time className="text-tiny text-default-400">2 days ago</time>
                                            </div>
                                        </div>
                                    ))}
                                    {messages.length == 0 && (
                                        <div className="h-[300px] flex flex-col justify-center items-center text-default-500">
                                            <NotificationIcon size={50} />
                                            <p className="mt-1">No notifications yet.</p>
                                        </div>
                                    )}
                                </ScrollShadow>
                            </CardBody>
                            <Divider />
                            <CardFooter className="justify-end gap-2">
                                <Button className="bg-transparent text-default-foreground data-[hover=true]:bg-default/40 px-4 h-10">Settings</Button>
                                <Button className="bg-default/40 text-default-foreground data-[hover=true]:opacity-hover px-4 h-10">
                                    Archive All
                                </Button>
                            </CardFooter>
                        </Card>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default Notification;
