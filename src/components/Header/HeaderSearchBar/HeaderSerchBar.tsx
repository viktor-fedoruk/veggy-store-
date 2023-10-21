import React, { FC } from "react";
import "./HeaderSearchBar.css";
import backArrow from "../../../../public/img/back-arrow.png";

interface HeaderSearchBarProps {
    width: number;
    onSetOpenSearchBar: (isOpen: boolean) => void,
    isOpenSearchBar: boolean,
    onHandleIsOpenSearchBar: () => void,
    onChangeHeaderSearchBarValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
    headerSearchBarValue: string,
    setHeaderSearchBarValue: (value: string) => void,
}

const HeaderSearchBar: FC <HeaderSearchBarProps> = (props) => {
    const {
        width,
        onSetOpenSearchBar,
        isOpenSearchBar,
        onHandleIsOpenSearchBar,
        onChangeHeaderSearchBarValue,
        headerSearchBarValue,
        setHeaderSearchBarValue,
    } = props;

    function cleaningInputText(): void {
        const searchInput = document.getElementById('search_product') as HTMLInputElement || null;

        if (searchInput) {
            searchInput.value = "";

            setHeaderSearchBarValue('');
        }
    }

    return (
        <div className="search_row">
            {(width <= 480 && isOpenSearchBar) && (
                <div
                    onClick={() => onSetOpenSearchBar(false)}
                    className="prevButton"
                >
                    <img
                        src={backArrow}
                        alt="Back-Arrow"
                    />
                </div>
            )}

            {(width > 480 || (width <= 480 && isOpenSearchBar)) && (
                <div className="search_product">
                    <input
                        className="header_searchBar_input"
                        id="search_product"
                        onChange={onChangeHeaderSearchBarValue}
                        type="text"
                        placeholder="Search for Vegetables and Fruits"
                    />

                    {headerSearchBarValue.length > 0 && (
                        <button
                            className="cleaning_input"
                            onClick={cleaningInputText}
                        >
                            ×
                        </button>
                    )}
                </div>
            )}

            <div className="search_button_wrapper">
                <button
                    className="search_button"
                    onClick={onHandleIsOpenSearchBar}
                >
                </button>
            </div>
        </div>
    )
}

export default HeaderSearchBar;