import React, {FC, useState} from "react";
import { iCartProducts } from "../../../../../types/data";
import "./ProductItem.css";

interface ProductItemProps {
    product: iCartProducts,
    cartProducts: iCartProducts[],
    setCartProducts: (productList: iCartProducts[]) => void,
    zoomProductImage: (e: React.MouseEvent<HTMLElement>) => void,
    setIsCartShakingAnimation: (isShaking: boolean) => void,
}

const ProductItem: FC <ProductItemProps> = (props) => {
    const {
        product,
        cartProducts,
        setCartProducts,
        zoomProductImage,
        setIsCartShakingAnimation,
    } = props;

    const [count, setCount] = useState<number>(1);
    const [buttonText, setButtonText] = useState<string>("ADD TO CART");

    function handleChangeButtonText() {
        setButtonText("ADDED");

        setTimeout(() => {
            setButtonText("ADD TO CART");
        }, 1000);
    }

    const incrementProductQuantity = () => {
        setCount(n => n + 1);
    };

    const decrementProductQuantity = () => {
        if (count === 1) {
            return;
        }

        setCount(count - 1);
    };

    function handleSetProductQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        setCount(parseInt(e.target.value));
    }

    function addToCart() {
        const productInCart = cartProducts.find(productItem => productItem.id === product.id);

        setIsCartShakingAnimation(true);

        if (!productInCart) {
            setCartProducts([
                ...cartProducts,
                {
                    ...product,
                    quantity: count,
                    sum: count * product.price,
                }
            ])
        } else {
            const productIndexInCartArray = cartProducts.findIndex(productItem => productItem.id === product.id);

            cartProducts[productIndexInCartArray] = {
                ...cartProducts[productIndexInCartArray],
                quantity: (productInCart.quantity ?? 0) + count,
                sum: ((productInCart.quantity ?? 0) + count) * productInCart.price,
            };

            setCartProducts([
                ...cartProducts
            ]);
        }
    }

    return (
        <li className="productItem" id={product.id.toString()}>
            <div
                onClick={zoomProductImage}
                className="productImg"
            >
                <img
                    src={product.image}
                    alt="ProductImage"
                />
            </div>

            <p className="productName">{product.name}</p>
            <p className="productPrice">{`$ ${product.price}`}</p>

            <div className="productCount">
                <button
                    onClick={decrementProductQuantity}
                    className="decrement count_btn"
                >
                    -
                </button>

                <input
                    className="count"
                    type="number"
                    onChange={handleSetProductQuantity}
                    value={count}
                />

                <button
                    onClick={incrementProductQuantity}
                    className="increment count_btn"
                >
                    +
                </button>
            </div>

            <div
                className="addButtonWrapper"
                onClick={addToCart}
            >
                <button
                    type="button"
                    onClick={handleChangeButtonText}
                    className={`addToCart ${buttonText ===  "ADD TO CART" ? "" : "active"}`}
                >
                    {buttonText}
                </button>
            </div>
        </li>
    )
}

export default ProductItem;