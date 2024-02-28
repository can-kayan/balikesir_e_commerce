// const { Discount, ShiperPrice, Order, OrderDetails, Basked, Product } = require("../../helper/modelsReferance")
// const errorMessages = require("../../errorHandling/errorMessages")
// const { orderId } = require("./productRating")

// const listPrice=async (req)=>{
//     try{ 
//         const discount=await Discount.findOne({_id:req.body.discountId})
//         if(!await discount.discountPercentage)discount.discountPercentage=1
//         let discountPercentage=discount.discountPercentage
//         const shipperPrice=await ShiperPrice.findOne({_id:req.body.shipperPrice})
//         if(!shipperPrice.price)shipperPrice.price=1
//         let shipperPricess=shipperPrice.price
//         let calculater= req.body.salePrice-(req.body.salePrice * (discountPercentage / 100)) + shipperPricess
//         return calculater
//     }catch{
//         return console.log(errorMessages.InternalError)
//     }
    
// }
// const companyId=async(req,index)=>{
//     try{
//             const basked=await Basked.findOne({_id:req.body.baskedId[index]})
//             console.log('InfoIDS ' +basked.productId.infolog._id.toString())
//         return basked.productId.infolog._id.toString()
    
//     }catch(error){
//         return console.log(error)
//     }
// }
// const orderDetailsId=async(req)=>{
//     try{
//         const orderDetails=await OrderDetails.findOne({orderId:req.body.orderId})
//         return orderDetails._id
//     }catch(error){
//         return console.log(error)
//     }
// }
// const shipmentCancelCompanyId=async(req)=>{
//     try{
//         let orderDetails=await OrderDetails.findOne({orderId:req.body.orderId})
//         if(!orderDetails){
//             orderDetails=await OrderDetails.findOne({_id:req.body.orderId})
//         }
//         return orderDetails.infolog
//     }catch(error){
//         return console.log(error)
//     }
// }
// const shipmentCancelCompanyIdRefund=async(req)=>{
//     try{
//         const orderDetails=await OrderDetails.findOne({_id:req.body.orderId})
//         return orderDetails.infolog
//     }catch(error){
//         return console.log(error)
//     }
// }
// const shipmentCancelUserId=async(req)=>{
//     try{
//         let order=await Order.findOne({_id:req.body.orderId})
//         if(!order){
//             const orderDetails=await OrderDetails.findOne({_id:req.body.orderId})
//             order=await Order.findOne({_id:orderDetails.orderId})
//         }
//         return order.infolog
//     }catch(error){
//         return console.log(error)
//     }
// }
// module.exports={listPrice,companyId,orderDetailsId,shipmentCancelCompanyId,shipmentCancelUserId,shipmentCancelCompanyIdRefund}