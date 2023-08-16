import { useEffect, useState } from 'react';
import { RotatingLines } from  'react-loader-spinner';
import Header from './components/VeggyHeader/Header.jsx';
import ProductList from './components/VeggyBody/ProductList.jsx';
import './assets/cssStyle/App.css';
import './components/VeggyHeader/HeaderCart/CartList/CartList.css';

function App() {
    const [shakingCart, setShakingCart] = useState(false);
    const [products, setProducts] = useState([]);
    const [headerCartProducts, setHeaderCartProducts] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isOpenHeaderCartModal,setIsOpenHeaderCartModal] = useState(false);
    const [isLoadingSpinner, setIsLoadingSpinner] = useState(false);

    useEffect(() => {
        async function getProducts() {
            try {
                setIsLoadingSpinner(true);

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
                setIsLoadingSpinner(false);
            }
        }

        getProducts();
    }, []);

    function handleChangeInputValue(e) {
        setInputText(e.target.value);
    }

    return (
        <div className="container">
            <Header
                onChangeHeaderInputValue={handleChangeInputValue}
                isOpenHeaderCartModal={isOpenHeaderCartModal}
                setIsOpenHeaderCartModal={setIsOpenHeaderCartModal}
                headerCartProducts={headerCartProducts}
                setHeaderCartProducts={setHeaderCartProducts}
                setShakingCart={setShakingCart}
                shakingCart={shakingCart}
                inputText={inputText}
                setInputText={setInputText}
            />

            {isLoadingSpinner ? (
                <div className="rotatingSpinner">
                    <RotatingLines
                        strokeColor="green"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="86"
                        visible
                    />
                </div>
            ) : (
                <ProductList
                    searchedProductName={inputText}
                    products={products}
                    selectedProducts={headerCartProducts}
                    setSelectedProducts={setHeaderCartProducts}
                    setShakingCart={setShakingCart}
                    shakingCart={shakingCart}
                />
            )}
        </div>
    )
}

export default App;
