import React from "react";
import Meta from "@/components/Meta";
import { Button, Tab, Tabs } from "@nextui-org/react";
import AdminProfile from "./components/profile";
import AdminAppearance from "./components/appearance";
import AdminAccount from "./components/account";
import AdminBilling from "./components/billing";

interface Props {}

const AdminSettings: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Meta title="Admin Settings Page" />
            <div>
                <div className="w-full max-w-3xl flex-1 py-4 px-8 sm:px-16">
                    <div className="flex items-center gap-x-3">
                        <Button className="text-tiny rounded-small px-0 !gap-0 bg-default/40 min-w-8 w-8 h-8 sm:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="img"
                                className="text-default-500"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M2 11c0-3.771 0-5.657 1.172-6.828C4.343 3 6.229 3 10 3h4c3.771 0 5.657 0 6.828 1.172C22 5.343 22 7.229 22 11v2c0 3.771 0 5.657-1.172 6.828C19.657 21 17.771 21 14 21h-4c-3.771 0-5.657 0-6.828-1.172C2 18.657 2 16.771 2 13z" />
                                    <path strokeLinecap="round" d="M15 21V3" />
                                </g>
                            </svg>
                        </Button>
                        <h1 className="text-3xl font-bold leading-9 text-default-foreground">Settings</h1>
                    </div>
                    <h2 className="mt-2 text-small text-default-500">Customize settings, email preferences, and web appearance.</h2>
                    <Tabs
                        color="default"
                        aria-label="Tabs colors"
                        radius="sm"
                        className="mt-4"
                        classNames={{ tab: "rounded-small w-[120px]", cursor: "rounded-small bg-content1 dark:bg-content1" }}
                    >
                        <Tab key="profile" title="Profile">
                            <AdminProfile />
                        </Tab>
                        <Tab key="music" title="Appearance">
                            <AdminAppearance />
                        </Tab>
                        <Tab key="videos" title="Account">
                            <AdminAccount />
                        </Tab>
                        <Tab key="billing" title="Billing">
                            <AdminBilling />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminSettings;
