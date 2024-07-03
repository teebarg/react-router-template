import { GithubIcon, YoutubeIcon, TwitterIcon, MailIcon } from "nui-react-icons";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { NavLink } from "react-router-dom";
import { Button, Input } from "@nextui-org/react";

const services = [
    {
        label: "Branding",
        to: "/",
    },
    {
        label: "Data Analysis",
        to: "/",
    },
    {
        label: "E-commerce Solutions",
        to: "/",
    },
    {
        label: "Market Research",
        to: "/",
    },
];

const support = [
    {
        label: "Pricing Plans",
        to: "/",
    },
    {
        label: "User Guides",
        to: "/",
    },
    {
        label: "Tutorials",
        to: "/",
    },
    {
        label: "Service Status",
        to: "/",
    },
];

const about = [
    {
        label: "Our Story",
        to: "/",
    },
    {
        label: "Latest News",
        to: "/",
    },
    {
        label: "Career Opportunities",
        to: "/",
    },
    {
        label: "Media Enquiries",
        to: "/",
    },
    {
        label: "Collaborations",
        to: "/",
    },
];

const legal = [
    {
        label: "Claim",
        to: "/",
    },
    {
        label: "Privacy",
        to: "/",
    },
    {
        label: "Terms",
        to: "/",
    },
    {
        label: "User Agreement",
        to: "/",
    },
];

export default function Footer() {
    return (
        <footer className="flex w-full flex-col">
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 md:pr-8">
                        <div className="flex items-center justify-start">
                            <span className="text-medium font-medium">RFT</span>
                        </div>
                        <p className="text-small text-default-500">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed neque elit, tristique
                        </p>
                        <div className="flex space-x-6">
                            <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                                <TwitterIcon className="text-default-500" size={34} />
                            </Link>
                            <Link isExternal aria-label="Twitter" href={siteConfig.links.github}>
                                <GithubIcon className="text-default-500" size={34} />
                            </Link>
                            <Link isExternal aria-label="Twitter" href={siteConfig.links.youtube}>
                                <YoutubeIcon className="text-default-500" size={34} />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <div>
                                    <h3 className="text-small font-semibold text-default-600">Services</h3>
                                    <ul className="mt-6 space-y-4">
                                        {services.map((item, index) => (
                                            <li key={index}>
                                                <NavLink className="text-small hover:opacity-80 transition-opacity text-default-400" to={item.to}>
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <div>
                                    <h3 className="text-small font-semibold text-default-600">Support</h3>
                                    <ul className="mt-6 space-y-4">
                                        {support.map((item, index) => (
                                            <li key={index}>
                                                <NavLink className="text-small hover:opacity-80 transition-opacity text-default-400" to={item.to}>
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <div>
                                    <h3 className="text-small font-semibold text-default-600">About Us</h3>
                                    <ul className="mt-6 space-y-4">
                                        {about.map((item, index) => (
                                            <li key={index}>
                                                <NavLink className="text-small hover:opacity-80 transition-opacity text-default-400" to={item.to}>
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <div>
                                    <h3 className="text-small font-semibold text-default-600">Legal</h3>
                                    <ul className="mt-6 space-y-4">
                                        {legal.map((item, index) => (
                                            <li key={index}>
                                                <NavLink className="text-small hover:opacity-80 transition-opacity text-default-400" to={item.to}>
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-10 rounded-medium bg-default-200/20 p-4 sm:my-14 sm:p-8 lg:my-16 lg:flex lg:items-center lg:justify-between lg:gap-2">
                    <div>
                        <h3 className="text-medium font-semibold text-default-600">Subscribe to our newsletter</h3>
                        <p className="mt-2 text-small text-default-400">
                            Receive weekly updates with the newest insights, trends, and tools, straight to your email.
                        </p>
                    </div>
                    <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
                        <Input
                            type="email"
                            placeholder="johndoe@email.com"
                            startContent={<MailIcon className="text-2xl text-default-500 pointer-events-none flex-shrink-0" />}
                        />
                        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                            <Button type="submit" color="secondary" variant="shadow">
                                Subscribe
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-wrap justify-between gap-2 pt-8">
                    <p className="text-small text-default-400">© 2024 RFT Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
