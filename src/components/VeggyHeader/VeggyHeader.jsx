import './VeggyHeader.css'
import HeaderLogo from "./HeaderLogo/HeaderLogo.jsx";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSerchBar.jsx";
import HeaderCart from "./HeaderCart/HeaderCart.jsx";
import {useEffect, useState} from "react";
import useWidth from "../../../hooks/useWindowResize.js";

export default function Header (props) {
    const [isOpenSearchBar, setIsOpenSearchBar] = useState(true);
    const width = useWidth();
    const isMobile = width <= 480;

    useEffect(() => {
      if (isMobile) {
          setIsOpenSearchBar(false);
      }
    }, [width]);

    function setInputOnClick (e) {
        if (isMobile) {
            setIsOpenSearchBar(true);
        }
    }

    return (
        <>
            <div className='header' >
                <div className='header_container'>
                    <div className='header_row'>
                        {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderLogo/>}
                        <HeaderSearchBar
                            width={width}
                            onSetOpenSearchBar={setIsOpenSearchBar}
                            isOpenSearchBar={isOpenSearchBar}
                            setInputOnClick={setInputOnClick}
                            getInputValue={props.getInputValue}
                        />
                        {(!isMobile || isMobile && !isOpenSearchBar) && <HeaderCart
                            modalActive={props.modalActive}
                            setModalActive={props.setModalActive}
                            products={props.products}
                            addProduct={props.addProduct}
                            setAddProduct={props.setAddProduct}
                            setShakingCart={props.setShakingCart}
                            shakingCart={props.shakingCart}
                        />}
                    </div>
                </div>
            </div>
        </>
    )
}