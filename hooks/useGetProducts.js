import { useEffect, useState } from "react";

export default function useGetProducts() {
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getUrl = async () => {
            try {
                setIsLoadingProducts(true);

                const response = await fetch('http://localhost:3001/vegs');

                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }

                const result = await response.json();

                setProducts(result)
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingProducts(false);
            }
        }

        getUrl();
    }, []);

    return [products, isLoadingProducts]
}

