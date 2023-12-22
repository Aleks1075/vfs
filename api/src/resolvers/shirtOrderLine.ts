import Shirts from '../models/shirts';
import { ShirtOrderLine } from '../types';

export default {
    shirts: async (parent: ShirtOrderLine, _args: never) => {
        const shirt = await Shirts.findById(parent.shirtsId);
        console.log("Fetched Shirt:", shirt);
        return shirt;
    },    
}