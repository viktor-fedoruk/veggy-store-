import { useEffect, useState } from "react";
import useWidth from "../../../hooks/useWindowResize.js";
import HeaderLogo from "./HeaderLogo/HeaderLogo.jsx";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSerchBar.jsx";
import HeaderCart from "./HeaderCart/HeaderCart.jsx";
import './VeggyHeader.css'

export default function Header (props) {
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
        <>
            <div className="header" >
                <div className="header_container">
                    <div className="header_row">
                        {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderLogo/>}
                        <HeaderSearchBar
                            width={width}
                            onSetOpenSearchBar={setIsOpenSearchBar}
                            isOpenSearchBar={isOpenSearchBar}
                            setInputOnClick={setInputOnClick}
                            handleGetInputValue={props.handleGetInputValue}
                        />
                        {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderCart
                            isModalActive={props.isModalActive}
                            setIsModalActive={props.setIsModalActive}
                            products={props.products}
                            selectedProducts={props.selectedProducts}
                            setSelectedProducts={props.setSelectedProducts}
                            setShakingCart={props.setShakingCart}
                            shakingCart={props.shakingCart}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}