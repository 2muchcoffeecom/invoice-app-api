import * as mongoose from 'mongoose';


export const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
}, {
  versionKey: false,
  timestamps: true,
});
