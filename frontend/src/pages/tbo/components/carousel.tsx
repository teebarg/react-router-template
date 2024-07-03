import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = ["/cat1.jpeg", "/cat2.jpeg", "/cat3.jpeg", "/cat4.jpeg"];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [images.length]);

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    return (
        <div className="relative w-full h-96">
            <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                <Button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-8 h-8" onClick={goToPrevSlide}>
                    <svg className="" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
                <Button className="rounded-full h-12 w-12" onClick={goToNextSlide}>
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" width="24" height="24">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Button>
            </div>
            {images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </div>
    );
};

export default Carousel;
