import './CartList.css';
import '../HeaderCart.css';
import emptyCartImg from '../../../../../public/img/empty-cart.png';

export  default function CartList({isOpenHeaderCartModal, headerCartProducts, setHeaderCartProducts}) {
    return (
        <>
        {isOpenHeaderCartModal &&
            <div className="cartListContainer">
                <div
                    className="cartListRow"
                    onClick={e => e.stopPropagation()}
                >
                    <div className={`emptyImageRow ${headerCartProducts.length > 0 ? "disable" : ""}`}>
                        <img
                            className="emptyCartImage"
                            alt="emptyCartImage"
                            src={emptyCartImg}
                        />
                        <h2 className="cartInfo">Your Cart is Empty!</h2>
                    </div>

                    {headerCartProducts.map(product =>
                        <ul className="cartListProductItem"
                            key={product.id}
                            id={product.id}
                            onAnimationEnd={() => {
                                setHeaderCartProducts(
                                    headerCartProducts.filter(a =>
                                        a.id !== product.id
                                    ));
                            }}
                        >
                            <div className="listProductImg">
                                <img
                                    className="listProductImage"
                                    src={product.image}
                                    alt="listProductImage"
                                />
                            </div>
                            <div className="listProductInfo">
                                <p className="listProductName">{product.name}</p>
                                <p className="listProductPrice">{`$ ${product.price}`}</p>
                            </div>
                            <div className="listProductQuantity-Sum">
                                <p className="listProductQuantity">{`${product.quantity} No.`}</p>
                                <p className="listProductSum">{`$ ${product.sum}`}</p>
                            </div>
                            <div className="removeProductBtn">
                                <button
                                    onClick={() => {
                                        const productItemUl = event.target.closest(".cartListProductItem");
                                        if (productItemUl) {
                                            productItemUl.classList.add("active");
                                        }
                                    }}
                                    className="removeProduct"
                                >
                                    ×
                                </button>
                            </div>
                        </ul>)}

                    <div className="checkoutButton">
                        <button
                            className="checkoutBtn"
                            type="button"
                            disabled="disabled"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

