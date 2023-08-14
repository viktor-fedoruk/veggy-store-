import { useState } from "react";
import ProductItem from "./VeggyProductItem/ProductItem.jsx";
import Modal from "./Modal/Modal.jsx";
import "./ProductBody.css";
export default function ProductList(props) {
    const {
        products,
        getProductName,
        selectedProducts,
        setSelectedProducts,
        setShakingCart,
        shakingCart
    } = props;
    const [modalActive, setModalActive] = useState(false);
    const [imageValue, setImageValue] = useState({ src: null, name: null, price: null });

    function zoomProductImage (e) {
        setModalActive(modalActive => !modalActive);

        const parentNode = e.target.closest('.productItem');
        let getImageProduct = e.target.src;
        let getProductId = parentNode.id;
        let getProductInfo = products.find(product =>
            product.id === parseInt(getProductId)
        );
        const updateImageValue = {
            src : getImageProduct,
            name : getProductInfo.name,
            price : getProductInfo.price,
        }
        setImageValue(updateImageValue);
    }

    return (
        <div className="productContainer">
            <ul className="productList">

                {products.filter(product => product.name.toLowerCase().startsWith(getProductName)).map((product) =>
                    <ProductItem
                        zoomProductImage={zoomProductImage}
                        key={product.id}
                        product={product}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        setShakingCart={setShakingCart}
                        shakingCart={shakingCart}
                    /> )}
            </ul>

            {modalActive && (
                < Modal
                    imageValue={imageValue}
                    setModalActive={setModalActive}
                >
                    <div
                        className="contentRow"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modalQuickWatchProductImage">
                            <img src={imageValue.src} alt="ProductImage" />
                        </div>
                        <div className="modalQuickWatchProductInfo">
                            <p className="modalQuickWatchProductName"> {imageValue.name}</p>
                            <p className="modalQuickWatchProductPrice">$ {imageValue.price}</p>
                        </div>
                        <div className="modalQuickWatchProductRemoveButton">
                            <button
                                onClick={() => setModalActive(false)}
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

