import './assets/cssStyle/App.css'
import './components/VeggyHeader/HeaderCart/CartList/CartList.css'
import Header from "./components/VeggyHeader/VeggyHeader.jsx";
import {useEffect, useState} from "react";
import VeggyBody from "./components/VeggyBody/VeggyBody.jsx";

function App() {
    const [shakingCart, setShakingCart] = useState(false);
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState([]);
    const [inputText, setInputText] = useState('');
    const [modalActive, setModalActive] = useState(false);


    function getInputValue(e) {
        setInputText(e.target.value)
    }

    console.log('teddadwdawst');

    useEffect(() => {
        async function getProduct () {
            const response = await fetch('http://localhost:3001/vegs');
            const responseJson = await response.json();


            if (responseJson) {
                setProducts(responseJson)
            }
        }

        getProduct()

    }, []);


    return (
        <div className='VeggyContainer' onClick={() => setModalActive(false)}>
            <Header getInputValue={getInputValue}
                    modalActive={modalActive}
                    setModalActive={setModalActive}
                    products={products}
                    addProduct={addProduct}
                    setAddProduct={setAddProduct}
                    setShakingCart={setShakingCart}
                    shakingCart={shakingCart}
            />
            <VeggyBody
                inputText={inputText}
                products={products}
                addProduct={addProduct}
                setAddProduct={setAddProduct}
                setShakingCart={setShakingCart}
                shakingCart={shakingCart}
            />
        </div>
    )
}

export default App;
