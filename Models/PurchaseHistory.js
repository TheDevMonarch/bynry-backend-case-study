import mongoose from 'mongoose'

const purchaseHistorySchema = new mongoose.Schema({
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required:true
  },

  Supplier:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Supplier',
    required:true
  },

  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0
    }
  }],

  price:{
    type:Number,
    required:true
  },

  status: {
    type: String,
    enum: ['pending', 'received', 'cancelled'],
    default: 'pending'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const PurchaseHistory = mongoose.model('PurchaseHistory',purchaseHistorySchema)