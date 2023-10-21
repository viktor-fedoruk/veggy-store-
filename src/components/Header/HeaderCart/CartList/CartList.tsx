import { FC } from "react";
import Modal from "../../../Modal/Modal"
import { iCartProducts } from "../../../../../types/data";
import "./CartList.css";
import "../HeaderCart.css";
import emptyCartImg from "../../../../../public/img/empty-cart.png";

interface iCartListProps {
    isOpenHeaderCartModal: boolean,
    setIsOpenHeaderCartModal: (isOpen: boolean) => void,
    headerCartProducts: iCartProducts[],
    setHeaderCartProducts: (productList: iCartProducts[]) => void,
}

const CartList: FC<iCartListProps> = (props) => {
    const {
        isOpenHeaderCartModal,
        setIsOpenHeaderCartModal,
        headerCartProducts,
        setHeaderCartProducts,
    } = props;

    return (
        <>
            {isOpenHeaderCartModal && (
                <Modal
                    onClose={() => setIsOpenHeaderCartModal(false)}
                    portalClassName="cart"
                    classNameContent="cartListContainer"
                >
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
                                id={product.id.toString()}
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

                                <div>
                                    <p className="cartListProductQuantity">{`${product.quantity} No.`}</p>
                                    <p className="cartListProductSum">{`$ ${product.sum}`}</p>
                                </div>

                                <div className="remove_product_wrapper">
                                    <button
                                        className="remove_product_button"
                                        onClick={(event ) => {
                                            const productItemUl = (event.target as HTMLElement).closest(".cartListProductItem");

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
                </Modal>
            )}
        </>
    )
}

export default CartList;
