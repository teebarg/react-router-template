import { useEffect, useRef } from "react";

type Callback<T> = (newValue: T, prevValue: T) => void;

const useWatch = <T>(value: T, callback: Callback<T>, dependencies: React.DependencyList = []) => {
    const prevValue = useRef(value);

    useEffect(() => {
        if (prevValue.current !== value) {
            callback(value, prevValue.current);
            prevValue.current = value;
        }
    }, [value, ...dependencies]);
};

export default useWatch;
