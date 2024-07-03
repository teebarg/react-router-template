"use client";

import { Navbar as NextUINavbar, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarBrand, NavbarItem, NavbarMenuItem } from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { SearchIcon } from "nui-react-icons";
import UserDropDown from "@/components/user-menu";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/store/auth-provider";
import type { AuthContextValue } from "@/store/auth-provider";
import Notification from "@/components/notification";

const AdminNavbar = () => {
    const { isAuthenticated } = useAuth() as AuthContextValue;
    const searchInput = (
        <Input
            aria-label="Search"
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
            }}
            endContent={
                <Kbd className="hidden lg:inline-block" keys={["command"]}>
                    K
                </Kbd>
            }
            labelPlacement="outside"
            placeholder="Search..."
            startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
            type="search"
        />
    );

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <Link className="flex justify-start items-center gap-1" to="/tbo">
                        <Logo />
                        <p className="font-bold text-inherit">RFT</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="flex basis-1/5 sm:basis-full" justify="end">
                <NavbarItem className="flex gap-2 items-baseline justify-center">
                    <Notification />
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
                <NavbarItem className="flex">
                    {isAuthenticated ? (
                        <UserDropDown />
                    ) : (
                        <NavLink to="/login" className="text-sm font-semibold leading-6">
                            Log In <span aria-hidden="true">&rarr;</span>
                        </NavLink>
                    )}
                </NavbarItem>
                <NavbarMenuToggle className="sm:hidden" />
            </NavbarContent>
            <NavbarMenu>
                {searchInput}
                <div className="mx-4 mt-2 flex flex-col gap-2">
                    {siteConfig.navItems.map((item, index: number) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <NavLink className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "text-danger" : "")} to={item.href}>
                                {item.label}
                            </NavLink>
                        </NavbarMenuItem>
                    ))}
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};

export default AdminNavbar;
