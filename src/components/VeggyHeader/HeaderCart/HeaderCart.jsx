import useWidth from "../../../../hooks/useWindowResize.js";
import CartList from "./CartList/CartList.jsx";
import './HeaderCart.css';
import CartImg from "../../../../public/img/cart.png";

export default function HeaderCart (props) {
    const {products,
        selectedProducts,
        setSelectedProducts,
        isModalActive,
        setIsModalActive,
        shakingCart,
        setShakingCart
    } = props;
    const productQuantity = selectedProducts.length;
    let getEachProductSum = selectedProducts.map(product => product.sum);
    let getAllProductSum  = getEachProductSum.reduce((sum, current) => sum + current, 0);
    let width = useWidth();
    function handleMoreClick() {
        setIsModalActive(!isModalActive);
    }

    return (
        <div className='cart_row' >
            <ul className='cart_info'>
                <li className='item_count'>No. of items	:
                    <strong> {productQuantity}</strong>
                </li>
                <li className='item_sum' >Sub Total :
                    <strong> {getAllProductSum}</strong>
                </li>
            </ul>
            <div className={shakingCart ? 'cart active' : 'cart'}
                 onClick={e => e.stopPropagation()}
                 onAnimationEnd={() => setShakingCart(false)}>
                {productQuantity > 0 && width <= 800 &&
                    <span
                        className='cart_count'>
                        {productQuantity}
                    </span>}
                <a href="#" >
                    <img
                        src={CartImg}
                        onClick={handleMoreClick}
                        alt='Cart Icon'/>
                </a>
            </div>
            <CartList
                setIsModalActive={setIsModalActive}
                isModalActive={isModalActive}
                products={products}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
            />
        </div>
    )
}