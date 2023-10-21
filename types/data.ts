export interface iCartProducts {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity?: number;
    sum?: number;
}

export interface iImageInfo {
    src: string,
    name: string,
    price: null | number,
}
