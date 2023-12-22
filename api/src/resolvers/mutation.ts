import { Args, Context } from '../types';
import Shirts from '../models/shirts';
import Order from '../models/order';
import Review from '../models/review';
import User from '../models/user';
import ShirtOrderLine from '../models/shirtOrderLine';
import jwt from 'jsonwebtoken';

export default {
    createShirts: async (_parent: never, {input}: Args) => {
        const newShirt = new Shirts(input);
        await newShirt.save();
        return newShirt;
    },
    deleteShirts: async (_parent: never, {id}: Args) => {
        const shirt = await Shirts.findByIdAndDelete(id);
        return shirt;
    },
    updateShirts: async (_parent: never, {input}: Args) => {
        const {id, ...updates} = input;
        const updatedProduct = await Shirts.findByIdAndUpdate(id, updates);
        return updatedProduct;
    },
    login: async (_parent: never, {userInput}: Args) => {

        const user = await User.findOne({username: userInput.username}).exec();
        if (!user) throw new Error('User not found');

        const validPassword = user.password === userInput.password;
        if (!validPassword) throw new Error('Invalid password');

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
        const token = jwt.sign({ username: user }, JWT_SECRET_KEY);

        return {user: user, token: token}
    },
    createOrder: async (_parent: never, { orderInput }: Args) => {
        try {
            // Process and save each shirt order line
            const processedShirtOrderLines = await Promise.all(
                orderInput.shirtOrderLines.map(async line => {
                    const newLine = new ShirtOrderLine(line);
                    if (!newLine.shirtsId || !newLine.quantity || !newLine.orderLinePrice || !newLine.size) {
                        throw new Error('Missing required fields in ShirtOrderLine');
                    }
                    await newLine.save();
                    return newLine.toObject(); // Convert Mongoose document to object
                })
            );

            // Create and save the new order
            const newOrder = new Order({
                ...orderInput,
                shirtOrderLines: processedShirtOrderLines,
            });

            // Save and return the order as a plain object
            const savedOrder = await newOrder.save();
            return savedOrder.toObject({ virtuals: true }); // Include virtuals like 'id'
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error in createOrder:', error.message);
                throw new Error('Error creating order: ' + error.message);
            } else {
                throw new Error('An unexpected error occurred in createOrder');
            }
        }
    },                    
    createReview: async (_parent:never, { reviewInput }:Args) => {
        const newReview = new Review(reviewInput);
        await newReview.save();
        return newReview;

    },
    addUser: async (_parent:never, { userInput }:Args) => {
        userInput.role = 'customer';
        if (userInput.username) {
            const existingUser = await User.findOne({ username: userInput.username });

            if (existingUser) {
                throw new Error('Duplicate username');
            }
        }

        const newUser = new User(userInput);
        await newUser.save();
        return newUser;

    },
}