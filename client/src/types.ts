export type Shirts = {
    id: string;
    name: string;
    description: string;
    country: string;
    year: number;
    price: number;
    size: string[];
    image: string;
    ratingAvg: number;
    };

export type CartItem = {
    shirtsId: string;
    quantity: number;
    size: string;
    orderLinePrice: number;
};