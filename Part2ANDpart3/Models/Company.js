import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})

export const Company = mongoose.model('Company', companySchema)