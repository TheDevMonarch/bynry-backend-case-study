import mongoose from 'mongoose'

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactEmail: {
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Supplier = mongoose.model('Supplier', supplierSchema);