import { useEffect, useState } from "react";
import { iCartProducts } from "../../../types/data";

export default function useGetProducts() {
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);
    const [products, setProducts] = useState<iCartProducts[]>([]);

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

    return [products, isLoadingProducts] as const
}

