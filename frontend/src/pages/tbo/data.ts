interface CategoryInterface {
    title: string;
    description: string;
    image: string;
    link: string;
    slug: string;
}

const categories: CategoryInterface[] = [
    {
        title: "Children's Clothing",
        description: "Find the best thrifts for your kids",
        image: "https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg",
        link: "/children-clothing",
        slug: "children-clothing",
    },
    {
        title: "Children's Shoes",
        description: "Discover a variety of shoes for your little ones",
        image: "https://nextui-docs-v2.vercel.app/images/fruit-2.jpeg",
        link: "/children-shoes",
        slug: "children-shoes",
    },
    {
        title: "Children's Accessories",
        description: "Explore a wide range of accessories for your kids",
        image: "https://nextui-docs-v2.vercel.app/images/fruit-3.jpeg",
        link: "/children-accessories",
        slug: "children-accessories",
    },
    {
        title: "Children's Toys",
        description: "Find the best toys for your kids",
        image: "https://nextui-docs-v2.vercel.app/images/fruit-4.jpeg",
        link: "/children-toys",
        slug: "children-toys",
    },
    {
        title: "Children's Gadget",
        description: "Find the best toys for your kids",
        image: "https://nextui.org/images/card-example-6.jpeg",
        link: "/children-gadget",
        slug: "children-gadget",
    },
    {
        title: "Baby Suits",
        description: "Find the best toys for your kids",
        image: "https://nextui-docs-v2.vercel.app/images/fruit-5.jpeg",
        link: "/children-roy",
        slug: "children-roy",
    },
];

const openingHours = [
    {
        day: "Monday",
        time: "9:00am - 10:00pm",
    },
    {
        day: "Tuesday",
        time: "9:00am - 10:00pm",
    },
    {
        day: "Wednesday",
        time: "9:00am - 10:00pm",
    },
    {
        day: "Thursday",
        time: "9:00am - 10:00pm",
    },
    {
        day: "Friday",
        time: "9:00am - 10:00pm",
    },
    {
        day: "Saturday",
        time: "9:00am - 6:00pm",
    },
    {
        day: "Sunday",
        time: "9:00am - 12:00pm",
    },
];

const sizes = ["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"];

const genders = [
    {
        title: "Boys",
        slug: "boys",
    },
    {
        title: "Girls",
        slug: "girls",
    },
    {
        title: "Unisex",
        slug: "unisex",
    },
];

const brands = [
    {
        title: "Puma",
        slug: "puma",
    },
    {
        title: "Adidas",
        slug: "adidas",
    },
    {
        title: "Nike",
        slug: "nike",
    },
    {
        title: "Reebok",
        slug: "reebok",
    },
    {
        title: "Jordan",
        slug: "jordan",
    },
];

const filters = [
    { key: "new", label: "Newest" },
    { key: "low-price", label: "Price: Low to High" },
    { key: "high-price", label: "Price: High to Low" },
    { key: "top-rated", label: "Top Rated" },
    { key: "most-popular", label: "Most Popular" },
];

export type { CategoryInterface };
export { categories, openingHours, sizes, genders, brands, filters };
