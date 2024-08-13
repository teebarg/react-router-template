import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { StarIcon } from "nui-react-icons";
import { Link, useNavigate } from "react-router-dom";
import { currency, imgSrc } from "@/utils/util";
import { Product } from "@/models/product";
import { ProductControl } from "./product-control";

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
                    alt={product.name}
                    className="object-contain h-[300px]"
                    src={imgSrc(`products%2F${product.image}`)}
                    fallbackSrc="https://via.placeholder.com/300x200"
                />
            </CardBody>
            <CardFooter className="block">
                <div className="flex gap-1">
                    <p className="text-xl text-[#C8102E]">{currency(product.price)}</p>
                    {product.old_price > 0 && <p className="text-default-500 line-through">{currency(product.old_price)}</p>}
                </div>
                <div className="h-20">
                    <div className="flex text-small justify-between mt-2">
                        <Link to={`/tbo/product/${product.slug}`} className="font-medium text-default-700 text-base line-clamp-2">{product.name}</Link>
                        {product.ratings && (
                            <div className="flex items-center">
                                <StarIcon className="text-default-500" role="img" size={16} />
                                <p>{product.ratings}</p>
                            </div>
                        )}
                    </div>
                    <p className="text-left text-small text-default-500 truncate mt-1">{product.description}</p>
                </div>
                <ProductControl product={product} />
            </CardFooter>
        </Card>
    );
};

export { ProductItem };
