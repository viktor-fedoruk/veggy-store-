import { FC, useState, MouseEvent } from "react";
import ProductItem from "./ProductItem/ProductItem";
import Modal from "../../Modal/Modal";
import { iCartProducts, iImageInfo } from "../../../../types/data";
import "./ProductList.css";
import NoFoundProductImg from "../../../../public/img/no-product-found.png";

interface iProductListProps {
    products: iCartProducts[],
    searchedProductName: string,
    cartProducts: iCartProducts[],
    setCartProducts: (cartList: iCartProducts[]) => void,
    setIsCartShakingAnimation: (isShaking: boolean) => void,
}

const ProductList: FC<iProductListProps> = (props) => {
    const {
        products,
        searchedProductName,
        cartProducts,
        setCartProducts,
        setIsCartShakingAnimation,
    } = props;

    const [isModalActive, setIsModalActive] = useState<boolean>(false);
    const [imageValue, setImageValue] = useState<iImageInfo>({ src: "", name: "", price: null });
    const filterProductsItem: iCartProducts[] = products.filter(product => product.name.toLowerCase().startsWith(searchedProductName.toLowerCase()));

    function zoomProductImage (e: MouseEvent<HTMLElement>): void {
        setIsModalActive(isModalActive => !isModalActive);
        const imageElement = e.target as HTMLImageElement;

        const parentNode = (e.target as HTMLElement).closest('.productItem');
        const getProductId = parentNode?.id;

        let getProductInfo;
        if (getProductId) {
            getProductInfo = products.find(product =>
                product.id === parseInt(getProductId)
            );
        }

        if (getProductInfo) {
            setImageValue({
                src: imageElement.src,
                name: getProductInfo?.name,
                price: getProductInfo?.price,
            });
        }
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

export default ProductList;
