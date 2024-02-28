const { default: mongoose } = require("mongoose")
const { MainCategory, Category } = require("../../helper/models")
const errorHandling = require("../../messageHandling/ErrorHandling")

const mainCategory=async(req)=>{
    try{
        const cateogory=await Category.findOne({_id:req.body.category})
        const mainCategory=await MainCategory.findOne({_id:cateogory.mainCategory})
        console.log('mainCategory Type',mainCategory._id)
        return mainCategory._id
    }catch{
        return errorHandling.anUnexpectedErrorOccurred
    }
    
}
   



module.exports={
    mainCategory
}