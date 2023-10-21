import React, { FC, useEffect, useState } from "react";
import useWindowWidth from "../../../hooks/useWindowResize";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderSearchBar from "./HeaderSearchBar/HeaderSerchBar";
import HeaderCart from "./HeaderCart/HeaderCart";
import { iCartProducts } from "../../../types/data";
import "./Header.css";

interface HeaderProps {
    headerCartProducts: iCartProducts[],
    setHeaderCartProducts: (productList: iCartProducts[]) => void,
    isOpenHeaderCartModal: boolean,
    setIsOpenHeaderCartModal: (isOpen: boolean) => void,
    isCartShakingAnimation: boolean,
    setIsCartShakingAnimation: (isShaking: boolean) => void,
    onChangeHeaderSearchBarValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    headerSearchBarValue: string,
    setHeaderSearchBarValue: (value: string) => void,
}

const Header: FC <HeaderProps> = (props) => {
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

    const [isOpenSearchBar, setIsOpenSearchBar] = useState<boolean>(true);
    const width: number = useWindowWidth();
    const isMobile: boolean = width <= 480;

    useEffect((): void => {
        if (isMobile) {
            setIsOpenSearchBar(false);
        }
    }, [width]);

    function handleIsOpenSearchBar(): void {
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

export default Header;