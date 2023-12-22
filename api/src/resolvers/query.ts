import { Args, Context } from '../types'
import Shirts from '../models/shirts'
import User from '../models/user'
import Order from '../models/order'
import Review from '../models/review'

export default {
    shirts: async () => await Shirts.find({}),
    shirt: async (_parent: never, {id}: Args) => {
        const product = await Shirts.findById(id);
        return product;
    },
    orders: async (_parent: never, _args: never, {user}: Context) => {
        if (!user) throw new Error('Not authenticated');
        return await Order.find({})
    },
    ordersByUser: async (_parent: never, {id}: Args) => {
        const allOrders = await Order.find({userId: id});
        return allOrders;
    },
            
    reviewsByShirts: async (_parent: never, {id}: Args) => {

        const allReviews = await Review.find({});
        const reviews = allReviews.filter((rev) => rev.shirtsId.toString() === id)
        return reviews
    },
    user: async (_parent: never, {id}: Args) => {
        const user = await User.findById(id);
        return user;
    },
}