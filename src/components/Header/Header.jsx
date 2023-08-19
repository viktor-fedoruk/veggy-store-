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
        onChangeHeaderSearchBarValue,
        headerSearchBarValue,
        setHeaderSearchBarValue,
    } = props;

    const [isOpenSearchBar, setIsOpenSearchBar] = useState(true);
    const width = useWindowWidth();
    const isMobile = width <= 480;

    useEffect(() => {
        if (isMobile) {
            setIsOpenSearchBar(false);
        }
    }, [width]);

    function handleIsOpenSearchBar() {
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
                        onHandleIsOpenSearchBar={handleIsOpenSearchBar}
                        onChangeHeaderSearchBarValue={onChangeHeaderSearchBarValue}
                        headerSearchBarValue={headerSearchBarValue}
                        setHeaderSearchBarValue={setHeaderSearchBarValue}
                    />

                    {(!isMobile || isMobile && !isOpenSearchBar) && (
                        <HeaderCart
                            isOpenHeaderCartModal={isOpenHeaderCartModal}
                            setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
                            headerCartProducts={headerCartProducts}
                            setHeaderCartProducts={setHeaderCartProducts}
                            setIsCartShakingAnimation={setIsCartShakingAnimation}
                            isCartShakingAnimation={isCartShakingAnimation}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}