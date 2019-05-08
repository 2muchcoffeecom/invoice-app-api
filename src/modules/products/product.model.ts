import { Schema, model } from 'mongoose';

import { IProduct } from './product.interface';

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true,
  },
  price: { type: Number, min: 0, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const product = model<IProduct>('Product', productSchema);

export default product;
