import mongoose, { Schema } from 'mongoose';
import ShirtOrderLine from './shirtOrderLine';

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Schema.Types.Date,
    default: Date.now,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shirtOrderLines: [ShirtOrderLine.schema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;