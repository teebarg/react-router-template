import React from "react";
import { Radio, RadioGroup } from "@nextui-org/react";
import cn from "classnames";
import { StarIcon } from "nui-react-icons";

interface RatingsProps {
    rating: number;
}

export const CustomRadio = (props: any) => {
    const { ratingsClass, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn("m-0 bg-content1 cursor-pointer border-2 border-transparent p-0"),
                wrapper: "hidden",
                labelWrapper: "ml-0",
            }}
        >
            <StarIcon className={cn("pointer-events-none transition-transform-colors", ratingsClass)} role="img" size={24} />
        </Radio>
    );
};

const Ratings: React.FC<RatingsProps> = ({ rating }) => {
    return (
        <React.Fragment>
            <RadioGroup orientation="horizontal">
                {[1, 2, 3, 4, 5].map((item: number, index: number) => (
                    <CustomRadio key={index} value={item} ratingsClass={rating >= item ? "text-primary" : "text-default-200"} />
                ))}
            </RadioGroup>
        </React.Fragment>
    );
};

export { Ratings };
