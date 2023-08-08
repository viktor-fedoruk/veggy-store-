import './HeaderSearchBar.css'
import arrow from './../../../img/back.png';
export default function HeaderSearchBar (props) {
    return (
        <div className='search_row'>
            {(props.width <= 480 && props.isOpenSearchBar) && (
                <div
                    onClick={() => props.onSetOpenSearchBar(false)}
                    className='prevButton'>
                    <img
                        src={arrow} alt='Back-Arrow' />
                </div>
            )}
            {(props.width > 480 || (props.width <= 480 && props.isOpenSearchBar)) && <div className='search_input'>
                <input
                    onChange={props.getInputValue}
                    className='input'
                    type='text'
                    placeholder='Search for Vegetables and Fruits'
                />
            </div>}
            <div className='search_button'>
                <button
                    onClick={props.setInputOnClick}
                    className='button'></button>
            </div>
        </div>
    )
}