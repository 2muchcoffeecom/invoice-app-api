import * as mongoose from 'mongoose';


export const InvoiceSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  discount: {
    type: Number,
  },
}, {
  versionKey: false,
  timestamps: true,
});
