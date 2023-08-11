import './ProductBody.css'
import ProductItem from "./VeggyProductItem/ProductItem.jsx";
import {useState} from "react";
import ModalProductItemImage from "./Modal/Modal.jsx";

export default function ProductBody(props) {
    const [modalActive, setModalActive] = useState(false);


    const [imageValue, setImageValue] = useState({src: null, name: null, price: null});
    function zoomProductImage (e) {
        setModalActive(!modalActive);

        const parentNode = e.target.closest('.productItem');
        let getImageProduct = e.target.src;
        let getProductId = parentNode.id;


        let getProductInfo = props.products.find(product =>
            product.id === parseInt(getProductId)
        )


        const updateImageValue = {};

        updateImageValue.src = getImageProduct;
        updateImageValue.name = getProductInfo.name;
        updateImageValue.price = getProductInfo.price;

        setImageValue(updateImageValue)
    }

    return (
        <>
            <div className="productContainer" >
                <div className="productList">
                    {props.products.filter(product =>
                        product.name.toLowerCase().startsWith(props.getProductName))
                        .map((product) =>
                        <ProductItem
                            zoomProductImage={zoomProductImage}
                            key={product.id}
                            product={product}
                            selectedProducts={props.selectedProducts}
                            setSelectedProducts={props.setSelectedProducts}
                            setShakingCart={props.setShakingCart}
                            shakingCart={props.shakingCart}
                        /> )}
                </div>
                {modalActive && (
                    < ModalProductItemImage
                        imageValue={imageValue}
                        setModalActive={setModalActive}>
                            <div className="contentRow"
                                 onClick={e => e.stopPropagation()}>
                                <div
                                    className="modalQuickWatchProductImage">
                                    <img src={imageValue.src} alt="ProductImage" />
                                </div>
                                <div className="modalQuickWatchProductInfo">
                                    <p className="modalQuickWatchProductName">
                                        {imageValue.name}
                                    </p>
                                    <p className="modalQuickWatchProductPrice">
                                        $ {imageValue.price}
                                    </p>
                                </div>
                                <div className="modalQuickWatchProductRemoveButton">
                                    <button
                                        onClick={() => setModalActive(false)}
                                        className="modalRemoveBtn">
                                        ×
                                    </button>
                                </div>
                            </div>
                     </ModalProductItemImage>
                )}
            </div>
        </>
    )
}

