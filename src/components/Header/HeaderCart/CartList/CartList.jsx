import './CartList.css';
import '../HeaderCart.css';
import emptyCartImg from '../../../../../public/img/empty-cart.png';

export  default function CartList({ isOpenHeaderCartModal, headerCartProducts, setHeaderCartProducts }) {
    return (
        <>
            {isOpenHeaderCartModal && (
                <div className="cartListContainer">
                    <div
                        className="cartListRow"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className={`emptyCartImageRow ${headerCartProducts.length > 0 ? "disable" : ""}`}>
                            <img
                                className="emptyCartImage"
                                src={emptyCartImg}
                                alt="emptyCartImage"
                            />
                            <h2 className="cartInfo">Your Cart is Empty!</h2>
                        </div>

                        {headerCartProducts.map(product => (
                            <ul className="cartListProductItem"
                                key={product.id}
                                id={product.id}
                                onAnimationEnd={() => {
                                    setHeaderCartProducts(
                                        headerCartProducts.filter(a =>
                                            a.id !== product.id
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

                                <div className="removeProductBtn">
                                    <button
                                        className="removeProduct"
                                        onClick={() => {
                                            const productItemUl = event.target.closest(".cartListProductItem");

                                            if (productItemUl) {
                                                productItemUl.classList.add("active");
                                            }
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            </ul>))
                        }

                        <div className="checkoutButton">
                            <button
                                className="checkoutBtn"
                                type="button"
                                disabled
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}

