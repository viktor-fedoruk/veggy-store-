import { useState } from "react";
import './ProductItem.css';

export default function ProductItem (props) {
    const {
        product,
        selectedProducts,
        setSelectedProducts,
        zoomProductImage,
        setShakingCart,
    } = props;

    const [count, setCount] = useState(1);
    const [buttonText, setButtonText] = useState('ADD TO CART');

    function handleClickChangeButtonText() {
        setButtonText('ADDED');

        setTimeout(() => {
            setButtonText('ADD TO CART');
        }, 1000);
    }

    const addCountHandler = () => {
        setCount(n => n + 1);
    };

    const removeCountHandler = () => {
        if(count === 1){
            alert('Your counter cannot be less than 0');
            return;
        }
        setCount(count - 1);
    };

    function checkInputCounter (e) {
        setCount(e.target.value);
    }

    function addProduct () {
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
        }else {
            const productIndexInCartArray = selectedProducts.findIndex(productItem => productItem.id === product.id);
            selectedProducts[productIndexInCartArray] = {
                ...selectedProducts[productIndexInCartArray],
                quantity: productInCart.quantity + count,
                sum: (productInCart.quantity + count) * productInCart.price
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

            <div
                className="productCount">
                <button
                    onClick={removeCountHandler}
                    className="decrement count_btn"
                >
                    -
                </button>

                <input
                    className="count"
                    type="number"
                    onChange={checkInputCounter}
                    value={count}
                />
                <button
                    onClick={addCountHandler}
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
                    onClick={handleClickChangeButtonText}
                    className={buttonText === "ADD TO CART" ? "addToCart" : "addToCart active"}
                >
                    {buttonText}
                </button>
            </div>
        </li>
    )
}

