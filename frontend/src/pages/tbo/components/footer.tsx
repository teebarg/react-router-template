import { GithubIcon, TwitterIcon, WhatsAppIcon, YoutubeIcon } from "nui-react-icons";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-secondary-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="mb-8 lg:mb-0">
                        <h3 className="text-xl font-bold text-danger-700 mb-4">About Us</h3>
                        <p className="text-default-600">
                            {`We are a dedicated online store offering a wide range of high-quality and fun products for kids. Our mission is to bring
                            joy and happiness to every child's life.`}
                        </p>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <h3 className="text-lg font-bold text-danger-700 mb-4">Customer Service</h3>
                        <ul className="text-default-600">
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    Contact Us
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    Shipping & Returns
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    FAQ
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-8 lg:mb-0">
                        <h3 className="text-lg font-bold text-danger-700 mb-4">Categories</h3>
                        <ul className="text-default-600">
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    Toys
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    Books
                                </NavLink>
                            </li>
                            <li className="mb-2">
                                <NavLink to="/" className="hover:text-pink-800 transition duration-300">
                                    Clothing
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-danger-700 mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                                <TwitterIcon className="text-default-500" size={34} />
                            </Link>

                            <Link isExternal aria-label="Twitter" href={siteConfig.links.github}>
                                <GithubIcon className="text-default-500" size={34} />
                            </Link>

                            <Link isExternal aria-label="Twitter" href={siteConfig.links.youtube}>
                                <YoutubeIcon className="text-default-500" size={34} />
                            </Link>
                            <Link isExternal aria-label="Twitter" href={siteConfig.links.whatsapp}>
                                <WhatsAppIcon className="text-default-500" size={34} />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-300 pt-8">
                    <p className="text-center text-default-600">&copy; {new Date().getFullYear()} Kiddies Online Store. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
