import {FC, useEffect, useState} from "react";
import useGetProducts from "./useGetProducts";
import Header from "../Header/Header";
import ProductList from "../Product/ProductList/ProductList";
import Spinner from "../Spinner/Spinner";
import { iCartProducts } from "../../../types/data";
import "./Home.css";
import "../Header/HeaderCart/CartList/CartList.css";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
    const [isCartShakingAnimation, setIsCartShakingAnimation] = useState<boolean>(false);
    const [headerCartProducts, setHeaderCartProducts] = useState<iCartProducts[]>([]);
    const [searchedProductName, setSearchedProductName] = useState<string>('');
    const [isOpenHeaderCartModal, setIsOpenHeaderCartModal] = useState<boolean>(false);
    const [products, isLoadingProducts] = useGetProducts();

    const navigate = useNavigate();

    function handleChangeHeaderSearchBarValue(e: React.ChangeEvent<HTMLInputElement>): void {
        setSearchedProductName(e.target.value);
    }

    // useEffect(() => {
    //     navigate("/FedyaFedya");
    // }, []);

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

export default Home;