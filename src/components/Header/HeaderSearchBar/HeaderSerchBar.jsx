import './HeaderSearchBar.css';
import backArrow from '../../../../public/img/back-arrow.png';

export default function HeaderSearchBar(props) {
    const {
        width,
        onSetOpenSearchBar,
        isOpenSearchBar,
        onHandleIsOpenSearchBar,
        onChangeHeaderSearchBarValue,
        headerSearchBarValue,
        setHeaderSearchBarValue,
    } = props;

    function cleaningInputText() {
        document.getElementById('search_product').value = '';

        setHeaderSearchBarValue('');
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