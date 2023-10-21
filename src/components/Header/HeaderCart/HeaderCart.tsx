import { FC } from "react";
import useWindowWidth from "../../../../hooks/useWindowResize";
import CartList from "./CartList/CartList";
import { iCartProducts } from "../../../../types/data";
import "./HeaderCart.css";
import CartImg from "../../../../public/img/cart.png";

interface HeaderCartProps {
    headerCartProducts: iCartProducts[],
    setHeaderCartProducts: (productList: iCartProducts[]) => void,
    isOpenHeaderCartModal: boolean,
    setIsOpenHeaderCartModal: (isOpen: boolean) => void,
    isCartShakingAnimation: boolean,
    setIsCartShakingAnimation: (isShaking: boolean) => void,
}

const HeaderCart: FC <HeaderCartProps> = (props) => {
    const {
        headerCartProducts,
        setHeaderCartProducts,
        isOpenHeaderCartModal,
        setIsOpenHeaderCartModal,
        isCartShakingAnimation,
        setIsCartShakingAnimation,
    } = props;

    const productQuantity: number = headerCartProducts.length;
    const getEachProductSum: (number | undefined)[] = headerCartProducts.map(product => product.sum);
    const getAllProductSum: number | undefined = getEachProductSum.reduce((sum, current) => {
        if (typeof sum === "number") {
            return sum + (current as number || 0);
        } else {
            return sum;
        }
    }, 0);
    const width: number = useWindowWidth();

    function handleToggleIsOpenCartList(): void {
        setIsOpenHeaderCartModal(!isOpenHeaderCartModal);
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

export default HeaderCart;