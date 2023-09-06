import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import ProductList from './components/Product/ProductList/ProductList.jsx';
import Spinner from "./components/Spinner/Spinner.jsx";
import './App.css';
import './components/Header/HeaderCart/CartList/CartList.css';
import useGetUrl from "../hooks/useGetUrl.js";

export default function App() {
    const [isCartShakingAnimation, setIsCartShakingAnimation] = useState(false);
    const [products, setProducts] = useState([]);
    const [headerCartProducts, setHeaderCartProducts] = useState([]);
    const [searchedProductName, setSearchedProductName] = useState('');
    const [isOpenHeaderCartModal, setIsOpenHeaderCartModal] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const getProductFromServer = useGetUrl('http://localhost:3001/vegs', setIsLoadingProducts, setProducts);

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
