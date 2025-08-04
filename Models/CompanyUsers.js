import mongoose from 'mongoose'

//Creating this schema so only admmin can create a product info and warehouse detail And staff can modify the quantity of products.

const CompanyUsersSchema = new mongoose.Schema({

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company', 
    required: true
  },

  role:{
    type:String,
    enum:["admin", "staff"],
    reqired:true
  },

  username:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },

  createdAt:{
    type:Date,
    default:Date.now
  }
});

export const CompanyUser = mongoose.model('CompanyUser', CompanyUsersSchema)