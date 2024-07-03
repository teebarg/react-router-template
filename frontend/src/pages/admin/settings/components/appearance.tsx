import React from "react";
import { Radio, RadioGroup, cn } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { DarkThemeIcon, LightThemeIcon } from "@/components/icons";
import { Select, Switch } from "nextui-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomRadio = (props: any) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "m-0 items-start group inline-flex flex-row-reverse justify-between hover:bg-content2 max-w-[300px] cursor-pointer gap-4 rounded-large border-1 border-default-200 px-4 py-2.5 shadow-md relative h-[132px] flex-1 overflow-hidden"
                ),
                description: "text-foreground text-medium",
            }}
        >
            {children}
        </Radio>
    );
};

interface Props {}

type Inputs = {
    title: string;
    location: string;
};

const AdminAppearance: React.FC<Props> = () => {
    const { control, register } = useForm<Inputs>();
    return (
        <React.Fragment>
            <div className="py-2">
                <div>
                    <p className="text-base font-medium text-default-700">Theme</p>
                    <p className="mt-1 text-sm font-normal text-default-400">Change the appearance of the web.</p>
                    <RadioGroup orientation="horizontal" className="mt-4" defaultValue="dark">
                        <CustomRadio description="Light" value="light">
                            <div className="absolute top-[30px]">
                                <DarkThemeIcon />
                            </div>
                        </CustomRadio>
                        <CustomRadio description="Dark" value="dark">
                            <div className="absolute top-[30px]">
                                <LightThemeIcon />
                            </div>
                        </CustomRadio>
                    </RadioGroup>
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <div className="flex items-start justify-between gap-2 py-2">
                    <div>
                        <p className="text-base font-medium text-default-700">Font size</p>
                        <p className="mt-1 text-sm font-normal text-default-400">Adjust the web font size.</p>
                    </div>
                    <Select
                        name="fontSize"
                        register={register}
                        required
                        options={[]}
                        control={control}
                        placeholder="Large"
                        className="max-w-[15rem]"
                    />
                </div>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1rem" }} />
                <Switch
                    classNames={{
                        base: cn("inline-flex flex-row-reverse w-full items-center max-w-none", "justify-between cursor-pointer gap-2 py-4 px-0"),
                    }}
                    defaultSelected
                >
                    <div className="flex flex-col">
                        <p className="text-medium">Translucent UI</p>
                        <p className="text-small text-default-500">Use transparency in UI elements like the sidebar and modal dialogs.</p>
                    </div>
                </Switch>
                <span aria-hidden="true" className="w-px h-px block" style={{ marginLeft: "0.25rem", marginTop: "1.5rem" }} />
                <Switch
                    classNames={{
                        base: cn("inline-flex flex-row-reverse w-full items-center max-w-none", "justify-between cursor-pointer gap-2 py-4 px-0"),
                    }}
                    defaultSelected
                >
                    <div className="flex flex-col">
                        <p className="text-medium">Use pointer cursor</p>
                        <p className="text-small text-default-500">Change the cursor to a pointer when hovering</p>
                    </div>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default AdminAppearance;
