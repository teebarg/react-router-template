/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useId } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon, EyeFilledIcon } from "nui-react-icons";
import { Checkbox, Switch, Select, SelectItem, Textarea } from "@nextui-org/react";

const formClasses = "input input-bordered w-full form-fix";

type Types = "text" | "password" | "email" | "number";

type RulesProps = {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    email?: boolean;
    confirmPassword?: object;
    pattern?: RegExp;
};

type FieldProps = {
    name: string;
    label?: string;
    className?: string;
    type?: Types;
    rules?: RulesProps;
    disabled?: boolean;
    labelPlacement?: "outside" | "inside";
    register: UseFormRegister<any>;
    [key: string]: any;
};

type Rules = {
    required?: boolean | string;
    min?: {
        value: number;
        message: string;
    };
    max?: {
        value: number;
        message: string;
    };
    minLength?: {
        value: number;
        message: string;
    };
    maxLength?: { value: number; message: string };
    pattern?: {
        value: RegExp;
        message: string;
    };
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/ban-types
    validate?: (value: {}) => boolean | string;
};

export function TextField({
    name,
    label,
    labelPlacement = "inside",
    type = "text",
    size = "md",
    defaultValue,
    register,
    rules,
    error,
    ...props
}: FieldProps) {
    const id = useId();
    const formRules: Rules = {};
    const { min, max, minLength, maxLength, email, required, pattern } = rules || {};

    if (required) {
        formRules["required"] = typeof required === "boolean" ? `${label} is required` : required;
    }

    if (min) {
        formRules["min"] = {
            value: min,
            message: `The value of ${label} must be greater than or equal to ${min}`,
        };
    }

    if (max) {
        formRules["max"] = {
            value: max,
            message: `The value of ${label} must be less than or equal to ${max}`,
        };
    }

    if (minLength) {
        formRules["minLength"] = {
            value: minLength,
            message: `${label} must have a minimum of ${minLength} characters`,
        };
    }

    if (maxLength) {
        formRules["maxLength"] = {
            value: maxLength,
            message: `${label} must have a minimum of ${maxLength} characters`,
        };
    }

    if (email) {
        formRules["pattern"] = {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
        };
    }

    if (pattern) {
        formRules["pattern"] = {
            value: pattern,
            message: "The value entered does not match the required pattern",
        };
    }

    return (
        <Input
            isClearable
            isRequired={required}
            id={id}
            type={type}
            label={label}
            labelPlacement={labelPlacement}
            {...props}
            defaultValue={defaultValue}
            className={formClasses}
            {...register(name, formRules)}
            isInvalid={error}
            errorMessage={error?.message}
            size={size}
        />
    );
}

export function SelectField({
    name,
    label,
    error,
    options,
    control,
    rules,
    variant = "flat",
    selectionMode = "single",
    labelPlacement = "inside",
    placeholder = "",
    description = "",
    size = "md",
    color = "",
    className = "",
}: any) {
    const id = useId();
    const { required } = rules || {};

    return (
        <Controller
            key={id}
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <Select
                    color={color}
                    variant={variant}
                    isRequired={required}
                    label={label}
                    onChange={onChange}
                    selectedKeys={value}
                    placeholder={placeholder}
                    description={description}
                    selectionMode={selectionMode}
                    labelPlacement={labelPlacement}
                    className={className}
                    size={size}
                    errorMessage={error?.message}
                    isInvalid={error}
                >
                    {options?.map((item: { value: string; label: string }) => <SelectItem key={item.value}>{item.label}</SelectItem>)}
                </Select>
            )}
        />
    );
}

export function PromptField({ name, register, rules, error, handleClick, loading, ...props }: FieldProps) {
    const id = useId();
    // eslint-disable-next-line no-undef
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };
    const formRules: Rules = {};
    const { required } = rules || {};
    if (required) {
        formRules["required"] = typeof required === "boolean" ? `Textfield is required` : required;
    }

    return (
        <div className="flex w-full items-center">
            <div className="overflow-hidden [&:has(textarea:focus)]:border-gray-200 [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full flex-grow relative border border-solid rounded-2xl border-gray-300">
                <textarea
                    id={id}
                    onInput={handleInput}
                    tabIndex={0}
                    rows={1}
                    placeholder="Message ChatGPT…"
                    className="m-0 w-full resize-none border-0 bg-transparent outline-none py-[10px] pr-10 md:py-3.5 md:pr-12 max-h-52 placeholder-black/50 dark:placeholder:text-white pl-3 md:pl-4 h-14 overflow-y-auto"
                    {...props}
                    {...register(name, formRules)}
                ></textarea>
                {loading ? (
                    <button className="absolute cursor-none bottom-1.5 right-2 p-1 rounded-full border-2 border-gray-950 dark:border-gray-200 md:bottom-3 md:right-3">
                        <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" strokeWidth="0"></path>
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={handleClick}
                        disabled={error}
                        className="absolute bottom-1.5 right-2 p-0.5 rounded-lg border border-black transition-colors enabled:bg-black disabled:text-gray-400 disabled:opacity-10 md:bottom-3 md:right-3"
                    >
                        <span data-state="closed">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                <path
                                    d="M7 11L12 6L17 11M12 18V7"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}

export function PasswordField({ name, label, register, rules, error, ...props }: FieldProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const id = useId();
    const formRules: Rules = {};
    const { minLength, maxLength, confirmPassword, required, pattern } = rules || {};

    if (required) {
        formRules["required"] = typeof required === "boolean" ? `${label} is required` : required;
    }

    if (minLength) {
        formRules["minLength"] = {
            value: minLength,
            message: `${label} must have a minimum of ${minLength} characters`,
        };
    }

    if (maxLength) {
        formRules["maxLength"] = {
            value: maxLength,
            message: `${label} must have a minimum of ${maxLength} characters`,
        };
    }

    if (confirmPassword) {
        // eslint-disable-next-line @typescript-eslint/ban-types
        formRules["validate"] = (value: {}) => value === confirmPassword || "Passwords do not match";
    }

    if (pattern) {
        formRules["pattern"] = {
            value: pattern,
            message: "The value entered does not match the required pattern",
        };
    }

    return (
        <Input
            isRequired={required}
            id={id}
            type={isVisible ? "text" : "password"}
            label={label}
            className={formClasses}
            {...register(name, formRules)}
            isInvalid={error}
            errorMessage={error?.message}
            endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                    {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                </button>
            }
            {...props}
        />
    );
}

export function SwitchField({ name, label, className, control }: FieldProps) {
    return (
        <div className={className}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Switch onChange={onChange} isSelected={value}>
                        {label}
                    </Switch>
                )}
            />
        </div>
    );
}

export function CheckBoxField({ name, label, className, control }: FieldProps) {
    return (
        <div className={className}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Checkbox onChange={onChange} defaultSelected={value} color="secondary" size="md">
                        {label}
                    </Checkbox>
                )}
            />
        </div>
    );
}

export function TextAreaField({ name, label, labelPlacement = "inside", register, rules, error, disabled, variant, ...props }: FieldProps) {
    const id = useId();
    const formRules: Rules = {};
    const { minLength, maxLength, required } = rules || {};

    if (required) {
        formRules["required"] = typeof required === "boolean" ? `${label} is required` : required;
    }

    if (minLength) {
        formRules["minLength"] = {
            value: minLength,
            message: `${label} must have a minimum of ${minLength} characters`,
        };
    }

    if (maxLength) {
        formRules["maxLength"] = {
            value: maxLength,
            message: `${label} must have a minimum of ${maxLength} characters`,
        };
    }

    return (
        <Textarea
            id={id}
            isRequired={required}
            isDisabled={disabled}
            variant={variant}
            label={label}
            labelPlacement={labelPlacement}
            {...register(name, formRules)}
            isInvalid={error}
            errorMessage={error?.message}
            {...props}
        />
    );
}
