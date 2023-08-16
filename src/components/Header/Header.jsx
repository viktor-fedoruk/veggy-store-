import { useEffect, useState } from "react";
import useWindowWidth from "../../../hooks/useWindowResize.js";
import HeaderLogo from "./HeaderLogo/HeaderLogo.jsx";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSerchBar.jsx";
import HeaderCart from "./HeaderCart/HeaderCart.jsx";
import './Header.css';

export default function Header(props) {
    const {
        headerCartProducts,
        setHeaderCartProducts,
        isOpenHeaderCartModal,
        setIsOpenHeaderCartModal,
        isCartShakingAnimation,
        setIsCartShakingAnimation,
        onChangeHeaderInputValue,
        headerProductSearchingInput,
        setHeaderProductSearchingInput,
    } = props;

    const [isOpenSearchBar, setIsOpenSearchBar] = useState(true);
    const width = useWindowWidth();
    const isMobile = width <= 480;

    useEffect(() => {
        if (isMobile) {
            setIsOpenSearchBar(false);
        }

    }, [width]);

    function showInputOnClick() {
        if (isMobile) {
            setIsOpenSearchBar(true);
        }
    }

    return (
        <div className="header">
            <div className="header_container">
                <div className="header_row">
                    {(!isMobile || isMobile && !isOpenSearchBar) && (
                        <HeaderLogo />
                    )}

                    <HeaderSearchBar
                        width={width}
                        onSetOpenSearchBar={setIsOpenSearchBar}
                        isOpenSearchBar={isOpenSearchBar}
                        onShowInputOnClick={showInputOnClick}
                        onChangeHeaderInputValue={onChangeHeaderInputValue}
                        headerProductSearchingInput={headerProductSearchingInput}
                        setHeaderProductSearchingInput={setHeaderProductSearchingInput}
                    />

                    {(!isMobile || isMobile && !isOpenSearchBar) && (
                        <HeaderCart
                        isOpenHeaderCartModal={isOpenHeaderCartModal}
                        setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
                        headerCartProducts={headerCartProducts}
                        setHeaderCartProducts={setHeaderCartProducts}
                        setIsCartShakingAnimation={setIsCartShakingAnimation}
                        isCartShakingAnimation={isCartShakingAnimation}
                    />)}
                </div>
            </div>
        </div>
    )
}