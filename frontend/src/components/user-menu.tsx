"use client";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User } from "@nextui-org/react";
import { useFetcher } from "react-router-dom";
import { useAuth } from "@/store/auth-provider";

export default function UserDropDown() {
    const { currentUser } = useAuth();
    const fetcher = useFetcher();

    return (
        <Dropdown placement="bottom-start">
            <DropdownTrigger>
                <User
                    as="button"
                    avatarProps={{
                        isBordered: true,
                        src: currentUser?.image || "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                    }}
                    className="transition-transform"
                    description={currentUser?.email}
                    name={currentUser?.lastname}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="user" className="h-14 gap-2">
                    <p className="font-bold">Signed in as</p>
                    <p className="font-bold">@{currentUser?.firstname}</p>
                </DropdownItem>

                <DropdownItem key="admin">
                    <a href="/admin">Admin</a>
                </DropdownItem>
                <DropdownItem key="profile">
                    <a href="/profile">Profile</a>
                </DropdownItem>
                <DropdownItem key="settings">
                    <a href="/admin/settings">Settings</a>
                </DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                    <fetcher.Form method="post" action="/logout">
                        <button type="submit">Sign out</button>
                    </fetcher.Form>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
