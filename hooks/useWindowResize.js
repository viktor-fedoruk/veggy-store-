import { useEffect, useState } from "react";

export default function useWidth() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const onResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        }
    }, []);

    return width;
}