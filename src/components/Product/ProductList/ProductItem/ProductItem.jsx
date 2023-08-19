import { useState } from "react";
import './ProductItem.css';

export default function ProductItem(props) {
    const {
        product,
        cartProducts,
        setCartProducts,
        zoomProductImage,
        setIsCartShakingAnimation,
    } = props;

    const [count, setCount] = useState(1);
    const [buttonText, setButtonText] = useState("ADD TO CART");

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

    function handleSetProductQuantity(e) {
        setCount(e.target.value);
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
                quantity: productInCart.quantity + count,
                sum: (productInCart.quantity + count) * productInCart.price,
            };

            setCartProducts([
                ...cartProducts
            ]);
        }
    }

    return (
        <li className="productItem" id={product.id}>
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

