import React from "react";
import { Radio, RadioGroup } from "@nextui-org/react";
import cn from "classnames";
import { StarIcon } from "nui-react-icons";

interface RatingsProps {
    rating: number;
    size?: number;
}

export const CustomRadio = (props: any) => {
    const { ratingsClass, size, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn("m-0 cursor-pointer border-2 border-transparent p-0 rtl:mr-0"),
                wrapper: "hidden",
                labelWrapper: "ml-0",
            }}
        >
            <StarIcon className={cn("pointer-events-none transition-transform-colors", ratingsClass)} role="img" size={size} />
        </Radio>
    );
};

const Ratings: React.FC<RatingsProps> = ({ rating, size = 24 }) => {
    return (
        <React.Fragment>
            <RadioGroup orientation="horizontal" classNames={{ wrapper: "gap-0" }}>
                {[1, 2, 3, 4, 5].map((item: number, index: number) => (
                    <CustomRadio key={index} value={item} ratingsClass={rating >= item ? "text-primary" : "text-default-200"} size={size} />
                ))}
            </RadioGroup>
        </React.Fragment>
    );
};

export { Ratings };
