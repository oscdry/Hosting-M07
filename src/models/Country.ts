import mongoose, { Document } from 'mongoose';

const CountrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true }
  });

export default mongoose.model('Country', CountrySchema);
