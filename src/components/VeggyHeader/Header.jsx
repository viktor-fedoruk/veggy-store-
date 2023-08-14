import { useEffect, useState } from "react";
import useWidth from "../../../hooks/useWindowResize.js";
import HeaderLogo from "./HeaderLogo/HeaderLogo.jsx";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSerchBar.jsx";
import HeaderCart from "./HeaderCart/HeaderCart.jsx";
import './Header.css';

export default function Header (props) {
    const {
        products,
        selectedProducts,
        setSelectedProducts,
        isModalActive,
        setIsModalActive,
        shakingCart,
        setShakingCart,
        handleGetInputValue,
    } = props;
    const [isOpenSearchBar, setIsOpenSearchBar] = useState(true);
    const width = useWidth();
    const isMobile = width <= 480;

    useEffect(() => {
        if (isMobile) {
            setIsOpenSearchBar(false);
        }
    }, [width]);

    function setInputOnClick () {
        if (isMobile) {
            setIsOpenSearchBar(true);
        }
    }

    return (
        <div className="header">
            <div className="header_container">
                <div className="header_row">

                    {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderLogo />}
                    <HeaderSearchBar
                        width={width}
                        onSetOpenSearchBar={setIsOpenSearchBar}
                        isOpenSearchBar={isOpenSearchBar}
                        setInputOnClick={setInputOnClick}
                        handleGetInputValue={handleGetInputValue}
                    />

                    {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderCart
                        isModalActive={isModalActive}
                        setIsModalActive={setIsModalActive}
                        products={products}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                        setShakingCart={setShakingCart}
                        shakingCart={shakingCart}
                    />}
                </div>
            </div>
        </div>
    )
}