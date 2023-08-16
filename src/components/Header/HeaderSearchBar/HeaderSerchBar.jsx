import './HeaderSearchBar.css';
import backArrow from '../../../../public/img/back-arrow.png';

export default function HeaderSearchBar(props) {
    function cleaningInputText() {
        document.getElementById('search_product').value = '';

        props.setHeaderProductSearchingInput('');
    }

    return (
        <div className="search_row">
            {(props.width <= 480 && props.isOpenSearchBar) && (
                <div
                    onClick={() => props.onSetOpenSearchBar(false)}
                    className="prevButton"
                >
                    <img
                        src={backArrow}
                        alt="Back-Arrow"
                    />
                </div>
            )}

            {(props.width > 480 || (props.width <= 480 && props.isOpenSearchBar)) && (
                <div className="search_product">
                    <input
                        id="search_product"
                        onChange={props.onChangeHeaderInputValue}
                        className="input"
                        type="text"
                        placeholder="Search for Vegetables and Fruits"
                    />

                    {props.headerProductSearchingInput.length > 0 && (
                        <button
                            className="cleaning_input"
                            onClick={cleaningInputText}
                        >
                            ×
                        </button>
                    )}
                </div>
            )}

            <div className="search_button">
                <button
                    onClick={props.onShowInputOnClick}
                    className="button"
                >
                </button>
            </div>
        </div>
    )
}