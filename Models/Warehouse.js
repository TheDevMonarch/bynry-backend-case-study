import mongoose from 'mongoose'

const warehouseSchema =  new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Company',
    required:true
  },
  location:{
    type:String,
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const Warehouse =  mongoose.model('Warehouse', warehouseSchema)