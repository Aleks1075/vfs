import mongoose, { Schema } from 'mongoose';

const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    shirtsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Shirts'
    },

    
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;