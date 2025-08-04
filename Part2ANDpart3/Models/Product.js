import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  isBundle: {
    type: Boolean,
    default: false
  },

  bundleItems: {
    ProductInfo: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    required: function () {
      return this.isBundle === true;
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Product = mongoose.model('Product', productSchema);
