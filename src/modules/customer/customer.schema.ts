import * as mongoose from 'mongoose';


export const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
    trim: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});
