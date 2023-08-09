import CartImg from "../../../../public/img/cart.png"
import './HeaderCart.css'
import CartList from "./CartList/CartList.jsx";
import useWidth from "../../../../hooks/useWindowResize.js";
export default function HeaderCart (props) {
    let productQuantity = props.addProduct.length;
    let getEachProductSum = props.addProduct.map(product => product.sum);
    let getAllProductSum  = getEachProductSum.reduce((sum, current) => sum + current, 0);
    let width = useWidth();
    function handleMoreClick() {
        props.setModalActive(!props.modalActive);
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
            <div className={props.shakingCart ? 'cart active' : 'cart'}
                 onClick={e => e.stopPropagation()}
                 onAnimationEnd={() => props.setShakingCart(false)}>
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
                setModalActive={props.setModalActive}
                modalActive={props.modalActive}
                products={props.products}
                addProduct={props.addProduct}
                setAddProduct={props.setAddProduct}
            />
        </div>
    )
}