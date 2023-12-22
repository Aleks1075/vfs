import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 16,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  role: { 
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer',
  }
});

const User = mongoose.model('User', userSchema);

export default User;