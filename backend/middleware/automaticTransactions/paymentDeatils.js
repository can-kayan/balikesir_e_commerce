// const errorMessages = require("../../errorHandling/errorMessages")
// const { Order } = require("../../models/order")
// const { Rpost } = require("../../repository/Rpost")

// const orderIds=async(req)=>{
//     try{
//         const order=await Order.findOne({baskedId:req.body.baskedId})
//         const id=order._id
//        return id
//     }catch(error){
//         return console.log(error)
//     }
// }
// const paymentDetailsCreate=async(req,conversationId,paymentId,paymentTransactionId)=>{
//     try{
//         const modelName='PaymentDetails'
//         const domainInfo={
//             conversationId:conversationId,
//             paymentId:paymentId,
//             paymentTransactionId:paymentTransactionId
//         }
        
//         req.headers['paymentDetailsId']=domainInfo
//         console.log('headers paymentDetails '+req.headers.paymentDetailsId)
//         return
//     }catch(error){
//         return errorMessages.BadFileRequest
//     }
// }
// module.exports={}
// paymentDetailsCreate,orderIds