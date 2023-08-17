import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import ProductList from './components/Product/ProductList/ProductList.jsx';
import Spinner from "./components/Product/Spinner/Spinner.jsx";
import './App.css';
import './components/Header/HeaderCart/CartList/CartList.css';

export default function App() {
    const [isCartShakingAnimation, setIsCartShakingAnimation] = useState(false);
    const [products, setProducts] = useState([]);
    const [headerCartProducts, setHeaderCartProducts] = useState([]);
    const [searchedProductName, setSearchedProductName] = useState('');
    const [isOpenHeaderCartModal,setIsOpenHeaderCartModal] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        async function getProducts() {
            try {
                setIsLoadingProducts(true);

                const response = await fetch('http://localhost:3001/vegs');

                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }

                const result = await response.json();

                setProducts(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingProducts(false);
            }
        }

        getProducts();
    }, []);

    function handleChangeInputValue(e) {
        setSearchedProductName(e.target.value);
    }

    return (
        <div className="container">
            <Header
                onChangeHeaderInputValue={handleChangeInputValue}
                isOpenHeaderCartModal={isOpenHeaderCartModal}
                setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
                headerCartProducts={headerCartProducts}
                setHeaderCartProducts={setHeaderCartProducts}
                setIsCartShakingAnimation={setIsCartShakingAnimation}
                isCartShakingAnimation={isCartShakingAnimation}
                headerProductSearchingInput={searchedProductName}
                setheaderProductSearchingInput={setSearchedProductName}
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
