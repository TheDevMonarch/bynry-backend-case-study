import mongoose from 'mongoose'

const warehouseInventorySchema = new mongoose.Schema({
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
  },

  warehouse:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Warehouse',
    required:true
  },

  quantity:{
    type:Number,
    required:true,
    min:1
  },

  //Added this minStock level for product, so later to send low - stock alerts.
  minStocklevel:{
    type:Number,
    required:true,
    min:0
  },
  
  lastUpdated:{
    type:Date,
    default:Date.now
  }
})

export const WarehouseInventory = mongoose.model('WarehouseInventory', warehouseInventorySchema)