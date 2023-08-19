import './CartList.css';
import '../HeaderCart.css';
import emptyCartImg from '../../../../../public/img/empty-cart.png';

export  default function CartList({ isOpenHeaderCartModal, headerCartProducts, setHeaderCartProducts }) {
    return (
        <>
            {isOpenHeaderCartModal && (
                <div className="cartListContainer">
                    <ul
                        className="cartListRow"
                        onClick={e => e.stopPropagation()}
                    >
                        {headerCartProducts.length === 0 && (
                            <div className="emptyCartImageRow">
                                <img
                                    className="emptyCartImage"
                                    src={emptyCartImg}
                                    alt="emptyCartImage"
                                />
                                <h2 className="cartInfo">Your Cart is Empty!</h2>
                            </div>
                        )}

                        {headerCartProducts.map(product => (
                            <li className="cartListProductItem"
                                key={product.id}
                                id={product.id}
                                onAnimationEnd={() => {
                                    setHeaderCartProducts(
                                        headerCartProducts.filter(item =>
                                            item.id !== product.id
                                        )
                                    );
                                }}
                            >
                                <div className="listProductImg">
                                    <img
                                        className="cartListProductImage"
                                        src={product.image}
                                        alt="cartListProductImage"
                                    />
                                </div>

                                <div className="cartListProductInfo">
                                    <p className="cartListProductName">{product.name}</p>
                                    <p className="cartListProductPrice">{`$ ${product.price}`}</p>
                                </div>

                                <div className="cartListProductQuantity-Sum">
                                    <p className="cartListProductQuantity">{`${product.quantity} No.`}</p>
                                    <p className="cartListProductSum">{`$ ${product.sum}`}</p>
                                </div>

                                <div className="remove_product_wrapper">
                                    <button
                                        className="remove_product_button"
                                        onClick={(event) => {
                                            const productItemUl = event.target.closest(".cartListProductItem");
                                            if (productItemUl) {
                                                productItemUl.classList.add("active");
                                            }
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </li>
                        ))}

                        {headerCartProducts.length > 0 && (
                            <div className="checkout_button_wrapper">
                                <button
                                    className="checkout_button"
                                    type="button"
                                    disabled
                                >
                                    PROCEED TO CHECKOUT
                                </button>
                             </div>
                        )}
                    </ul>
                </div>
            )}
        </>
    )
}

