import { Order } from "../types";
import User from "../models/user";

export default {
    shirtOrderLines: async (parent: Order, _args: never) => {
        return parent.shirtOrderLines
    },

    user: async (parent: Order, _args: never) => {
        return await User.findById(parent.userId)
    },

}