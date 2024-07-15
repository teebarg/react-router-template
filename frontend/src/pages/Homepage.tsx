import React from "react";
import { GithubIcon } from "nui-react-icons";
import { Image, ScrollShadow } from "@nextui-org/react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { sponsors } from "./data";
import { Cookie } from "@/components/cookie";
import Meta from "@/components/Meta";

interface Props {}

const Homepage: React.FC<Props> = () => {
    const features = [
        {
            name: "Push to deploy",
            description: "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
            icon: GithubIcon,
        },
        {
            name: "SSL certificates",
            description: "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
            icon: GithubIcon,
        },
        {
            name: "Simple queues",
            description: "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
            icon: GithubIcon,
        },
        {
            name: "Advanced security",
            description: "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
            icon: GithubIcon,
        },
    ];
    return (
        <React.Fragment>
            <Meta title="Homepage" />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                    <div className="bg-content1 px-6">
                        <div className="max-w-2xl mx-auto py-8">
                            <div className="text-center relative">
                                <h1 className="text-4xl font-bold tracking-tight text-default-700 font-display">
                                    The fast, easy way to{" "}
                                    <span className="from-[#FF1CF7] to-[#b249f8] bg-clip-text text-transparent bg-gradient-to-b">develop</span> apps
                                    and websites
                                </h1>
                                <p className="mt-6 text-lg text-default-500">
                                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
                                    veniam occaecat fugiat aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam aperiam cum
                                    cupiditate quasi dolor nulla explicabo, similique sit reprehenderit quisquam numquam delectus? Consequuntur natus
                                    sapiente quidem fugit deserunt nam perferendis?
                                </p>
                                <div className="relative max-w-7xl w-auto h-[300px] md:h-[500px] mt-4">
                                    <Image isZoomed src="/images/hero.jpg" alt="hero" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-content2 py-10 px-6">
                        <div className="max-w-4xl mx-auto">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                                {features.map((feature) => (
                                    <div key={feature.name} className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                                                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-default-500">{feature.description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                    <div className="bg-content1 py-8 px-6">
                        <div className="mx-auto w-full max-w-5xl px-6 py-8 md:py-20">
                            <ScrollShadow className="mask" orientation="horizontal" size={400}>
                                <div className="flex w-max items-stretch gap-[40px] animate-scrolling-banner hover:[animation-play-state:paused]">
                                    {sponsors.map((item, index) => (
                                        <div key={index} className="flex items-center justify-center text-foreground">
                                            {item.icon}
                                        </div>
                                    ))}
                                </div>
                            </ScrollShadow>
                        </div>
                    </div>
                    <div className="bg-content2 py-16 px-6">
                        <div className="max-w-xl mx-auto text-center">
                            <h1 className="text-3xl font-semibold tracking-tight text-default-700 font-display">Get Started</h1>
                            <p className="text-default-500 mt-2">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro deleniti eius ad sequi, ab minima voluptate quis
                                voluptas inventore. Architecto necessitatibus voluptatibus facilis itaque, sint sed optio aliquid laboriosam ad.
                            </p>
                            <div className="mt-4">
                                <a
                                    href="https://blog.niyi.com.ng/"
                                    target="_blank"
                                    className="whitespace-nowrap font-semibold text-primary"
                                    rel="noreferrer"
                                >
                                    Learn more <span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                <Cookie />
                <Footer />
            </div>
        </React.Fragment>
    );
};

export default Homepage;
