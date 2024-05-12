import mongoose, { Document } from 'mongoose';

const CitySchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  country: { type: String, required: true },
  admin1: { type: String, required: false },
  lat: { type: String, required: false },
  lon: { type: String, required: false },
  pop: { type: String, required: false }
});

  export default mongoose.model('City', CitySchema);