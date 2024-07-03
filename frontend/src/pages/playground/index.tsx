import React from "react";
import Meta from "@/components/Meta";
import { Button, Select, SelectItem, Textarea, Slider, Tabs, Tab, ScrollShadow } from "@nextui-org/react";
import { RightArrowIcon, AttachmentIcon, VoiceIcon, TemplateIcon } from "nui-react-icons";
import { AiMessage } from "./components/ai-message";
import { UserMessage } from "./components/user-message";

interface Props {}

const PlaygroundPage: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Meta title="Admin Playground" />
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center p-4">
                    <section className="h-full w-full">
                        <header className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
                            <div className="flex items-center gap-2">
                                <h1 className="text-large font-medium">Playground</h1>
                                {/* <Button className="aria-expanded:opacity-70 subpixel-antialiased flex lg:hidden">
                                    <EllipsisIcon role="img" />
                                </Button> */}
                            </div>
                            <div className="flex items-center gap-2">
                                <Select
                                    label="Select an animal"
                                    size="sm"
                                    className="group flex flex-col transition-background motion-reduce:transition-none !duration-150 group relative justify-end w-[200px] max-w-[120px] lg:max-w-[230px]"
                                    classNames={{
                                        trigger: "h-10 min-h-10",
                                    }}
                                >
                                    {[
                                        { key: "1", label: "Preset 1" },
                                        { key: "2", label: "Preset 2" },
                                    ].map((item) => (
                                        <SelectItem key={item.key}>{item.label}</SelectItem>
                                    ))}
                                </Select>
                                <Button className=" bg-default/40 text-default-foreground data-[hover=true]:opacity-hover">Save</Button>
                                <Button className="bg-default/40 text-default-foreground data-[hover=true]:opacity-hover">Update</Button>
                                <Button className="bg-danger/20 text-danger dark:text-danger-500 data-[hover=true]:opacity-hover">Delete</Button>
                            </div>
                        </header>
                        <main className="flex mt-6">
                            <div className="hidden w-1/4 flex-none flex-col gap-4 lg:flex">
                                <Textarea label="System" placeholder="You are a helpful Acme AI code assistant" className="max-w-xs" />
                                <Select
                                    label="Model"
                                    className="groupp flexp flex-colp transition-backgroundp motion-reduce:transition-nonep !duration-150 group relative justify-end"
                                    defaultSelectedKeys={["gpt-4"]}
                                >
                                    {[
                                        { key: "gpt-4", label: "gpt-4" },
                                        { key: "gpt-3.5-turbo-16k", label: "gpt-3.5-turbo-16k" },
                                        { key: "babbage-002", label: "babbage-002" },
                                        { key: "davinci-002", label: "davinci-002" },
                                    ].map((item) => (
                                        <SelectItem key={item.key}>{item.label}</SelectItem>
                                    ))}
                                </Select>
                                <div className="mt-2 flex w-full flex-col gap-6 px-1">
                                    <Slider
                                        label="Temperature"
                                        step={0.01}
                                        maxValue={1}
                                        minValue={0}
                                        defaultValue={0.4}
                                        size="sm"
                                        className="max-w-md"
                                    />
                                    <Slider
                                        label="Max Length"
                                        step={50}
                                        maxValue={2500}
                                        minValue={0}
                                        defaultValue={1191}
                                        size="sm"
                                        className="max-w-md"
                                    />
                                    <Slider label="Top P" step={0.01} maxValue={1} minValue={0} defaultValue={0.5} size="sm" className="max-w-md" />
                                    <Slider
                                        label="Frequency Penalty"
                                        step={0.01}
                                        maxValue={1}
                                        minValue={0}
                                        defaultValue={0}
                                        size="sm"
                                        className="max-w-md"
                                    />
                                    <Slider
                                        label="Presence Penalty"
                                        step={0.01}
                                        maxValue={2}
                                        minValue={0}
                                        defaultValue={1}
                                        size="sm"
                                        className="max-w-md"
                                    />
                                </div>
                            </div>
                            <div className="relative flex w-full flex-col gap-2 lg:w-3/4">
                                <div className="flex h-full w-full flex-col gap-8 max-w-full px-0 lg:pl-10">
                                    <div className="flex w-full flex-wrap items-center justify-center gap-2 border-b-small border-divider pb-2 sm:justify-between">
                                        <p className="text-base font-medium">{`Creative Uses for Kids' Art`}</p>
                                        <Tabs size="md" aria-label="Tabs sizes">
                                            <Tab key="photos" title="Photos" />
                                            <Tab key="music" title="Music" />
                                            <Tab key="videos" title="Videos" />
                                        </Tabs>
                                    </div>
                                    <ScrollShadow className="flex flex-col h-[40vh] lg:h-[50vh]">
                                        <div className="flex flex-col gap-4 px-1 mt-2">
                                            <UserMessage>
                                                {`What are 5 creative things I could do with my kids' art? I don't want to throw them away,
                                                            but it's also so much clutter.`}
                                            </UserMessage>
                                            <AiMessage>
                                                <div>
                                                    <p className="mb-3">
                                                        {`Certainly! Here's a summary of five creative ways to use your kids' art:`}
                                                    </p>
                                                    <ol className="space-y-2">
                                                        <li>
                                                            <strong>Create Art Books:</strong> Turn scanned artwork into custom photo books.
                                                        </li>
                                                        <li>
                                                            <strong>Set Up a Gallery Wall:</strong> Use a dedicated wall with interchangeable frames
                                                            for displaying art.
                                                        </li>
                                                        <li>
                                                            <strong>Make Functional Items:</strong> Print designs on items like pillows, bags, or
                                                            mugs.
                                                        </li>
                                                        <li>
                                                            <strong>Implement an Art Rotation System:</strong> Regularly change the displayed art,
                                                            archiving the older pieces.
                                                        </li>
                                                        <li>
                                                            <strong>Use as Gift Wrap:</strong> Repurpose art as unique wrapping paper for presents.
                                                        </li>
                                                    </ol>
                                                </div>
                                            </AiMessage>
                                            <UserMessage>{`I didn't like the suggestions. Can you give me some more?`}</UserMessage>
                                            <AiMessage>
                                                <div>
                                                    <p className="mb-3">
                                                        {`Of course! Here are five more creative suggestions for what to do with your
                                                                    children's art:`}
                                                    </p>
                                                    <ol className="space-y-2">
                                                        <li>
                                                            <strong>Create a Digital Archive:</strong> Scan or take photos of the artwork and save it
                                                            in a digital cloud storage service for easy access and space-saving.
                                                        </li>
                                                        <li>
                                                            <strong>Custom Calendar:</strong>{" "}
                                                            {`Design a custom calendar with each month
                                                                        showcasing a different piece of your child's art.`}
                                                        </li>
                                                        <li>
                                                            <strong>Storybook Creation:</strong> Compile the artwork into a storybook, possibly with a
                                                            narrative created by your child, to make a personalized book.
                                                        </li>
                                                        <li>
                                                            <strong>Puzzle Making:</strong> Convert their artwork into a jigsaw puzzle for a fun and
                                                            unique pastime activity.
                                                        </li>
                                                        <li>
                                                            <strong>Home Decor Items:</strong> Use the artwork to create home decor items like
                                                            coasters, magnets, or lampshades to decorate your house.
                                                        </li>
                                                    </ol>
                                                </div>
                                            </AiMessage>
                                        </div>
                                    </ScrollShadow>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex w-full flex-col gap-4">
                                            <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2">
                                                <div className="flex gap-2">
                                                    <button
                                                        className="z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 text-small rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover flex h-14 flex-col items-start gap-0"
                                                        type="button"
                                                    >
                                                        <p>Create a blog post about NextUI</p>
                                                        <p className="text-default-500">explain it in simple terms</p>
                                                    </button>
                                                    <button
                                                        className="z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 text-small rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover flex h-14 flex-col items-start gap-0"
                                                        type="button"
                                                    >
                                                        <p>Give me 10 ideas for my next blog post</p>
                                                        <p className="text-default-500">include only the best ideas</p>
                                                    </button>
                                                    <button
                                                        className="z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 text-small rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover flex h-14 flex-col items-start gap-0"
                                                        type="button"
                                                    >
                                                        <p>Compare NextUI with other UI libraries</p>
                                                        <p className="text-default-500">be as objective as possible</p>
                                                    </button>
                                                    <button
                                                        className="z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 text-small rounded-medium [&>svg]:max-w-[theme(spacing.8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-default/40 text-default-foreground data-[hover=true]:opacity-hover flex h-14 flex-col items-start gap-0"
                                                        type="button"
                                                    >
                                                        <p>Write a text message to my friend</p>
                                                        <p className="text-default-500">be polite and friendly</p>
                                                    </button>
                                                </div>
                                            </ScrollShadow>
                                            <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
                                                <Textarea
                                                    placeholder="Enter a prompt"
                                                    classNames={{
                                                        base: "min-h-[40px]",
                                                        inputWrapper: "!bg-transparent shadow-none",
                                                        innerWrapper: "relative",
                                                        input: "py-0 pt-1 pl-2 pb-6 !pr-10 text-medium",
                                                    }}
                                                    endContent={
                                                        <div className="flex items-end gap-2">
                                                            <Button className="bg-default text-default-foreground min-w-8 w-8 h-8 px-0 !gap-0 rounded-large text-tiny">
                                                                <RightArrowIcon size={20} className="-rotate-90" />
                                                            </Button>
                                                        </div>
                                                    }
                                                />
                                                <div className="flex w-full items-center justify-between gap-2 overflow-scroll px-4 pb-4">
                                                    <div className="flex w-full gap-1 md:gap-3">
                                                        <Button className="px-3 min-w-16 h-8 text-tiny bg-default/40 text-default-foreground rounded-small">
                                                            <AttachmentIcon role="img" className="text-default-500" />
                                                            Attach
                                                        </Button>
                                                        <Button className="px-3 min-w-16 h-8 text-tiny bg-default/40 text-default-foreground rounded-small">
                                                            <VoiceIcon size={18} role="img" className="text-default-500" />
                                                            Voice Commands
                                                        </Button>
                                                        <Button className="px-3 min-w-16 h-8 text-tiny bg-default/40 text-default-foreground rounded-small">
                                                            <TemplateIcon role="img" className="text-default-500" />
                                                            Templates
                                                        </Button>
                                                    </div>
                                                    <p className="py-1 text-tiny text-default-400">0/2000</p>
                                                </div>
                                            </form>
                                        </div>
                                        <p className="px-2 text-tiny text-default-400">
                                            AI can make mistakes. Consider checking important information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </section>
                </div>
            </div>
        </React.Fragment>
    );
};

export { PlaygroundPage };
