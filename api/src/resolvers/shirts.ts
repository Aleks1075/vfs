import Review from '../models/review';
import { Shirts } from '../types';

export default {
    ratingAvg: async (parent:Shirts, _args:never) => {
        const allReviews = await Review.find({});
        const reviews = allReviews.filter((rev)=> rev.shirtsId.toString() === parent.id)
        let result = 0;
        if(reviews.length > 0){
            reviews.map((rev)=> result+=rev.rating)
            result = result/reviews.length
        }
        return result
    }
}