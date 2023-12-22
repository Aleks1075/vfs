import mongoose from 'mongoose';

const shirtOrderLineSchema = new mongoose.Schema({
    orderLinePrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shirtsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shirts',
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
});

// Virtual for ID
shirtOrderLineSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

// Ensure virtual fields are serialized
shirtOrderLineSchema.set('toJSON', {
    virtuals: true,
});

const ShirtOrderLine = mongoose.model('ShirtOrderLine', shirtOrderLineSchema);

export default ShirtOrderLine;