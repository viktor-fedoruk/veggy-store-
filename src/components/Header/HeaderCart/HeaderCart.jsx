import useWindowWidth from "../../../../hooks/useWindowResize.js";
import CartList from "./CartList/CartList.jsx";
import "./HeaderCart.css";
import CartImg from "../../../../public/img/cart.png";

export default function HeaderCart(props) {
    const {
        headerCartProducts,
        setHeaderCartProducts,
        isOpenHeaderCartModal,
        setIsOpenHeaderCartModal,
        isCartShakingAnimation,
        setIsCartShakingAnimation,
    } = props;

    const productQuantity = headerCartProducts.length;
    let getEachProductSum = headerCartProducts.map(product => product.sum);
    let getAllProductSum  = getEachProductSum.reduce((sum, current) => sum + current, 0);
    let width = useWindowWidth();

    function handleToggleIsOpenCartList() {
        setIsOpenHeaderCartModal((isOpenHeaderCartModal) => !isOpenHeaderCartModal);
    }

    return (
        <div className="cart_row">
            <ul className="cart_info">
                <li className="cart_item_count">No. of items :
                    <strong>{productQuantity}</strong>
                </li>

                <li className='cart_item_sum' >Sub Total :
                    <strong>{getAllProductSum}</strong>
                </li>
            </ul>

            <div
                className={`cart ${isCartShakingAnimation ? "active" : ""}`}
                 onClick={e => e.stopPropagation()}
                 onAnimationEnd={() => setIsCartShakingAnimation(false)}
            >
                {(productQuantity > 0 && width <= 800) && (
                    <span className="cart_count">{productQuantity}</span>
                )}

                <span className='cart_icon'>
                    <img
                        src={CartImg}
                        onClick={handleToggleIsOpenCartList}
                        alt="Cart Icon"
                    />
                </span>
            </div>

            <CartList
                isOpenHeaderCartModal={isOpenHeaderCartModal}
                headerCartProducts={headerCartProducts}
                setHeaderCartProducts={setHeaderCartProducts}
                setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
            />
        </div>
    )
}