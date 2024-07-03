export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Next Fast Template",
    description: "Make beautiful websites regardless of your coding experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Profile",
            href: "profile",
        },
        {
            label: "Admin",
            href: "/admin",
        },
        {
            label: "SandBox",
            href: "/sandbox",
        },
        {
            label: "TBO",
            href: "/tbo",
        },
        {
            label: "Playground",
            href: "/playground",
        },
        {
            label: "Blog",
            href: "https://blog.niyi.com.ng",
            external: true,
        },
    ],
    navMenuItems: [
        {
            label: "Profile",
            href: "/profile",
        },
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Settings",
            href: "/settings",
        },
        {
            label: "Help & Feedback",
            href: "/help-feedback",
        },
        {
            label: "Logout",
            href: "/logout",
        },
    ],
    links: {
        github: "https://github.com/teebarg",
        twitter: "https://twitter.com",
        docs: "https://nextui.org",
        youtube: "https://youtube.com",
        whatsapp: "https://youtube.com",
    },
};
