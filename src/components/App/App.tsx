import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import "../Header/HeaderCart/CartList/CartList.css";
import Checkout from "../Routes/Checkout";

const App = () => {
    return (
        <Routes>
            <Route path="/veggy-store-" element={<Home />} />
            <Route path="/veggy-store-/checkout/1" element={<Checkout />} />
        </Routes>
    )
}

export default App;