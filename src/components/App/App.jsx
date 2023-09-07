import { useState } from 'react';
import useGetProducts from "./useGetProducts.js";
import Header from '../Header/Header.jsx';
import ProductList from '../Product/ProductList/ProductList.jsx';
import Spinner from "../Spinner/Spinner.jsx";
import './App.css';
import '../Header/HeaderCart/CartList/CartList.css';

export default function App() {
    const [isCartShakingAnimation, setIsCartShakingAnimation] = useState(false);
    const [headerCartProducts, setHeaderCartProducts] = useState([]);
    const [searchedProductName, setSearchedProductName] = useState('');
    const [isOpenHeaderCartModal, setIsOpenHeaderCartModal] = useState(false);
    const [products, isLoadingProducts] = useGetProducts();

    function handleChangeHeaderSearchBarValue(e) {
        setSearchedProductName(e.target.value);
    }

    return (
        <div className="container">
            <Header
                onChangeHeaderSearchBarValue={handleChangeHeaderSearchBarValue}
                isOpenHeaderCartModal={isOpenHeaderCartModal}
                setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
                headerCartProducts={headerCartProducts}
                setHeaderCartProducts={setHeaderCartProducts}
                setIsCartShakingAnimation={setIsCartShakingAnimation}
                isCartShakingAnimation={isCartShakingAnimation}
                headerSearchBarValue={searchedProductName}
                setHeaderSearchBarValue={setSearchedProductName}
            />

            {isLoadingProducts ? (
                <Spinner />
            ) : (
                <ProductList
                    searchedProductName={searchedProductName}
                    products={products}
                    cartProducts={headerCartProducts}
                    setCartProducts={setHeaderCartProducts}
                    setIsCartShakingAnimation={setIsCartShakingAnimation}
                />
            )}
        </div>
    )
}
