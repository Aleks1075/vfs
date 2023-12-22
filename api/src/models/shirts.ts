import mongoose from 'mongoose'

const shirtsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: [String],
        default: ['S', 'M', 'L'],
        required: false
    },
    image: {
        type: String,
        required: true
    },
    ratingAvg: {
        type: Number,
        required: false
    }
});

const Shirts = mongoose.model('Shirts', shirtsSchema);

export default Shirts;