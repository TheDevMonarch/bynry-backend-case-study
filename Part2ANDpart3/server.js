import express from 'express'
import { Company } from './Models/Company.js';
import { Warehouse } from './Models/Warehouse.js';
import { WarehouseInventory } from './Models/WarehouseInventory.js';
import { InventoryChanges } from './Models/InventoryChanges.js';
import { SupplierProduct } from './Models/SupplierProduct.js';
import dotenv from 'dotenv'

dotenv.config({
  path:'./config.env'
})

const app = express();

app.get('/api/companies/:company_id/alerts/low-stock', async (req, res) => {
  const { company_id } = req.params;
  try {

    //Check if company exist or not
    const company = await Company.findById(company_id);
    if (!company) {
      return res.status(404).json({ message: "Company not exist", success: false });
    }

    //Get the warehouses of the company
    const warehouse_ids = await Warehouse.find({ company: company_id }).select('_id').lean();
    if(!warehouse_ids){
      return res.status(404).json({message:"Warehouses not found", success:false})
    }

    //converting the array of object of warehouse id into array of warehouse ids
    const id_array = warehouse_ids.map((data) => { return data._id });

    //setting the date that is 30days before of todays date
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    //getting only that product ids which are matched to specific warehouse and that has recent sales activity.
    const inventoryChanges = await InventoryChanges.find({ warehouse: { $in: id_array }, changedAt:{ $gte: monthAgo } }).select('product')

    //converting the array of object of products id into array of product id
    const recentSaleActivityProductIds = inventoryChanges.map((data)=>{
      return data.product;
    })

    //getting the warehouse inventory data that matches with warehouse ids as well as only that product's which have recent sales activity
    const data = await WarehouseInventory.find({ warehouse: { $in: id_array }, product:{$in: recentSaleActivityProductIds} }).populate().lean();

    //filtering the products which have low quantity than threshold
    const lowStockAlertData = data.filter((data)=>{
      return data.quantity<=data.minStocklevel
    });

    //getting the product id which have low quantity than threshold
    const lowStockAlertDataProducts = lowStockAlertData.map((data)=>{
      return data.product._id;
    })

    //Here getting the suppliers of the above product id's
    const suppliers = await SupplierProduct.find({product:{$in:lowStockAlertDataProducts}}).select('supplier product').populate('supplier').lean();

    //Now adding the suppliers to the populated content of warehouseInventory
    const lowStockWithSuppliers = lowStockAlertData.map((item)=>{
      const matchedSupplier = suppliers.filter(S=> S.product.toString() === item.product._id.toString()).map(s=>s.supplier);
      return{
        ...item,
        Supplier:matchedSupplier
      }
    })

    return res.status(200).json({alerts:lowStockWithSuppliers, total_alerts: lowStockWithSuppliers.length});

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
  }

})

const port = process.env.PORT

app.listen(port, ()=>{console.log(`Server is running on port ${port}`)})