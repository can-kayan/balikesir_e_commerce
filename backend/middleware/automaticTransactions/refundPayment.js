// const { OrderDetails,PaymentDetails } = require("../../helper/models")

// const paytmentTransictionsId=async(req)=>{
//     const orderDetails=await OrderDetails.findOne({_id:req.body.orderId})
//     return orderDetails.paymentTransactionId
// }
// const refundPriceValues=async(req)=>{
//     const orderDetails=await OrderDetails.findOne({_id:req.body.orderId})
//     const paymentDetails=await PaymentDetails.findOne({paymentTransactionId:orderDetails.paymentTransactionId})
//     return paymentDetails.paidPrice
// }

// module.exports={paytmentTransictionsId,refundPriceValues}