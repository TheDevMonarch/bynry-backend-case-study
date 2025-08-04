import mongoose from 'mongoose'

const inventoryChangesSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  warehouse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: true
  },
  quantityChange: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  changedAt: {
    type: Date,
    default: Date.now
  }
});

export const InventoryChanges = mongoose.model('InventoryChanges', inventoryChangesSchema)
