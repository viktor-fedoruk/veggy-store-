import {useState} from "react";
import './ProductItem.css';


export default function ProductItem (props) {
    const [count, setCount] = useState(1);
    const [buttonText, setButtonText] = useState('ADD TO CART');
    function handleClick() {
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
        setCount(e.target.value)
    }

    function addProduct () {
        const productInCart = props.selectedProducts.find(product => product.id === props.product.id);

        props.setShakingCart(true);

        if (!productInCart) {
            props.setSelectedProducts([
                ...props.selectedProducts,
                {
                    ...props.product,
                    quantity: count,
                    sum: count * props.product.price,
                }
            ])
        }else {
            const productIndexInCartArray = props.selectedProducts.findIndex(product => product.id === props.product.id);
            props.selectedProducts[productIndexInCartArray] = {
                ...props.selectedProducts[productIndexInCartArray],
                quantity: productInCart.quantity + count,
                sum: (productInCart.quantity + count) * productInCart.price
            };
            props.setSelectedProducts([
                ...props.selectedProducts
            ]);
        }
    }

    return (
        <>
            <ul className="productItem"
                id={props.product.id}>
                <div
                    onClick={props.zoomProductImage}
                    className="productImg">
                    <img src={props.product.image} alt='ProductImage' />
                </div>
                <p className="productName">
                    {props.product.name}
                </p>
                <p className="productPrice">
                    {`$ ${props.product.price}`}
                </p>
                <div className="productCount">
                    <button onClick={removeCountHandler}
                            className="decrement count_btn">
                        -
                    </button>
                    <input className="count" type="number"
                           onChange={checkInputCounter}
                           value={count}
                    />
                    <button onClick={addCountHandler}
                            className="increment count_btn">
                        +
                    </button>
                </div>
                <div className="addButtonWrapper"
                     onClick={addProduct}>
                    <button type='button'
                            onClick={handleClick}
                            className={buttonText === "ADD TO CART" ? "addToCart" : "addToCart active"}>
                        {buttonText}
                    </button>
                </div>
            </ul>
        </>
    )
}

