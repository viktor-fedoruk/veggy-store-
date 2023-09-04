import { useState } from "react";
import ProductItem from "./ProductItem/ProductItem.jsx";
import Modal from "../../Modal/Modal.jsx";
import "./ProductList.css";
import NoFoundProductImg from "../../../../public/img/no-product-found.png";

export default function ProductList(props) {
    const {
        products,
        searchedProductName,
        cartProducts,
        setCartProducts,
        setIsCartShakingAnimation,
    } = props;

    const [isModalActive, setIsModalActive] = useState(false);
    const [imageValue, setImageValue] = useState({ src: null, name: null, price: null });
    const filterProductsItem = products.filter(product => product.name.toLowerCase().startsWith(searchedProductName.toLowerCase()));

    function zoomProductImage (e) {
        setIsModalActive(isModalActive => !isModalActive);

        const parentNode = e.target.closest('.productItem');
        let getProductId = parentNode.id;
        let getProductInfo = products.find(product =>
            product.id === parseInt(getProductId)
        );

        setImageValue({
            src: e.target.src,
            name: getProductInfo.name,
            price: getProductInfo.price,
        });
    }

    return (
        <div className="productContainer">
            <ul className="productList">
                {filterProductsItem.length === 0 ? (
                    <div className="no_found_product_container"
                    >
                        <img
                            src={NoFoundProductImg}
                            alt="No-Found-Product-Img"
                        />
                    </div>
                ) : (
                    filterProductsItem.map((product) => (
                        <ProductItem
                            zoomProductImage={zoomProductImage}
                            key={product.id}
                            product={product}
                            cartProducts={cartProducts}
                            setCartProducts={setCartProducts}
                            setIsCartShakingAnimation={setIsCartShakingAnimation}
                        />
                    )))
                }
            </ul>

            {isModalActive && (
                <Modal
                    imageValue={imageValue}
                    isOpen={() => setIsModalActive(true)}
                    onClose={() => setIsModalActive(false)}
                    portalClassName="body"
                    classNameWrapper="product_list_row"
                    classNameContent="watch_product_item"
                >
                    <div
                        className="contentRow"
                    >
                        <div className="modalQuickWatchProductImage">
                            <img
                                src={imageValue.src}
                                alt="ProductImage"
                            />
                        </div>
                        <div className="modalQuickWatchProductInfo">
                            <p className="modalQuickWatchProductName"> {imageValue.name}</p>
                            <p className="modalQuickWatchProductPrice">$ {imageValue.price}</p>
                        </div>
                        <div className="modalQuickWatchProductRemoveButton">
                            <button
                                onClick={() => setIsModalActive(false)}
                                className="modalRemoveBtn"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}

