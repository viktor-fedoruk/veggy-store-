import './CartList.css'
import cartListImg from './../../../../img/empty-cart.png'
import '../HeaderCart.css'

export  default function CartList ({modalActive, addProduct,setAddProduct}) {

    return (
        <>
        {modalActive &&
            <div className='cartListContainer'>
                <div className='cartListRow'
                     onClick={e => e.stopPropagation()}>
                    <div className={addProduct.length > 0 ? 'emptyImageRow disable' : 'emptyImageRow'}>
                        <img className='emptyCartImage'
                             alt='emptyCartImage'
                             src={cartListImg}/>
                        <h2 className='cartInfo'>
                            Your Cart is Empty!
                        </h2>
                    </div>
                    {addProduct.map(product =>
                        <ul className='listProductItem'
                            onAnimationEnd={() => {
                                setAddProduct(
                                    addProduct.filter(a =>
                                        a.id !== product.id
                                    ));
                            }}
                            key={product.id}
                            id={product.id}>
                            <div className='listProductImg'>
                                <img className='listProductImage' src={product.image} alt='listProductImage'/>
                            </div>
                            <div className='listProductInfo'>
                                <p className='listProductName'>
                                    {product.name}
                                </p>
                                <p className='listProductPrice'>
                                    {`$ ${product.price}`}
                                </p>
                            </div>
                            <div className='listProductQuantity-Sum'>
                                <p className='listProductQuantity'>
                                    {`${product.quantity} No.`}
                                </p>
                                <p className='listProductSum'>
                                    {`$ ${product.sum}`}
                                </p>
                            </div>
                            <div className='removeProductBtn'>
                                <button
                                    onClick={() => {
                                        const productItemUl = event.target.closest('.listProductItem');
                                        if (productItemUl) {
                                            console.log(productItemUl);
                                            productItemUl.classList.add("active");
                                        }
                                    }}
                                    className='removeProduct'>
                                    ×
                                </button>
                            </div>
                        </ul>)}
                    <div className='checkoutButton'>
                        <button className='checkoutBtn'
                                type='button'
                                disabled='disabled'>PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>}
        </>
    )
}

