import { JwtPayload } from 'jsonwebtoken';

type Shirts = {
    id: string;
    description: string;
    country: string;
    year: number;
    price: number;
    size: string[];
    image: string;
    ratingAvg: number;
}

type User = {
    id: string | undefined;
    username: string;
    password: string;
    role: string;
}

type ShirtOrderLine = {
    id: string;
    orderLinePrice: number;
    quantity: number;
    size: string;
    shirtsId: string;
}

type Order = {
    id: string;
    orderDate: () => number;
    totalPrice: number;
    shirtOrderLines: ShirtOrderLine[];
    userId: string;
}

type Review = {
    id: string;
    title: string;
    text: string;
    rating: number;
    userId: string;
    shirtsId: string;
}

type Context = {
    user: JwtPayload;
}

type Args = {
    id: string;
    input: Shirts;
    userInput: User;
    orderInput: Order;
    reviewInput: Review;
    shirtOrderLineInput: ShirtOrderLine;
}

export type { Shirts, User, ShirtOrderLine, Order, Review, Context, Args };