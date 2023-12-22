import Shirts from '../models/shirts';
import user from '../models/user';
import { Review } from '../types';

export default {
    user: async (parent: Review, _args: never) => {
        return await user.findById(parent.userId)
    },

    shirts: async (parent: Review, _args: never) => {
        return await Shirts.findById(parent.shirtsId)
    },
}
