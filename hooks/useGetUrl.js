import { useEffect } from "react";

export default function useGetUrl( url, setIsLoadingProducts, products ) {
    useEffect(() => {
        const getUrl = async () => {
            try {
                setIsLoadingProducts(true);

                const response = await fetch(url);

                if (!response.ok) {
                    const message = `An error has occured: ${response.status}`;
                    throw new Error(message);
                }

                const result = await response.json();

                products(result);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoadingProducts(false);
            }
        }

        getUrl();
    }, []);
}

