import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import type { Product } from "../data";
import { StarIcon } from "nui-react-icons";
import { useNavigate } from "react-router-dom";
import { currency, imgSrc } from "@/utils/util";

interface ComponentProps {
    product: Product;
}

const ProductItem: React.FC<ComponentProps> = ({ product }) => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate("/tbo/product");
    };
    return (
        <Card shadow="sm" onPress={handleNavigation}>
            <CardBody className="overflow-visible p-0 bg-transparent">
                <Button isIconOnly className="absolute right-5 top-5 z-20 rounded-full bg-default/40 text-default-foreground min-w-8 w-8 h-8">
                    <StarIcon className="text-default-500" role="img" size={16} />
                </Button>
                <Image
                    isZoomed
                    shadow="sm"
                    radius="none"
                    width="100%"
                    alt={product.title}
                    className="object-contain h-[300px]"
                    src={imgSrc(`products%2F${product.img}`)}
                    fallbackSrc="https://via.placeholder.com/300x200"
                />
            </CardBody>
            <CardFooter className="block">
                <div className="flex gap-1">
                    <p className="text-xl text-[#C8102E]">{currency(product.price)}</p>
                    {product.oldPrice && <p className="text-default-500 line-through">{currency(product.oldPrice)}</p>}
                </div>
                <div className="h-12">
                    <div className="flex text-small justify-between mt-2">
                        <p className="font-medium text-default-700 text-base">{product.title}</p>
                        {product.rating && (
                            <div className="flex items-center">
                                <StarIcon className="text-default-500" role="img" size={16} />
                                <p>{product.rating}</p>
                            </div>
                        )}
                    </div>
                    <p className="text-left text-small text-default-500">{product.desc}</p>
                </div>
                <Button color="primary" variant="shadow" className="w-full mt-3 h-12">
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export { ProductItem };
