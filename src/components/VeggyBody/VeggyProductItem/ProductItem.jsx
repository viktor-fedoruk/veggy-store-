import { useState } from "react";
import './ProductItem.css';

export default function ProductItem(props) {
    const {
        product,
        selectedProducts,
        setSelectedProducts,
        zoomProductImage,
        setShakingCart,
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

    function addProduct() {
        const productInCart = selectedProducts.find(productItem => productItem.id === product.id);

        setShakingCart(true);

        if (!productInCart) {
            setSelectedProducts([
                ...selectedProducts,
                {
                    ...product,
                    quantity: count,
                    sum: count * product.price,
                }
            ])
        } else {
            const productIndexInCartArray = selectedProducts.findIndex(productItem => productItem.id === product.id);

            selectedProducts[productIndexInCartArray] = {
                ...selectedProducts[productIndexInCartArray],
                quantity: productInCart.quantity + count,
                sum: (productInCart.quantity + count) * productInCart.price,
            };

            setSelectedProducts([
                ...selectedProducts
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
                onClick={addProduct}
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

