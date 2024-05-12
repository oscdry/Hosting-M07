import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false,
  },
  myCities: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }]
});

export default mongoose.model('User', userSchema);