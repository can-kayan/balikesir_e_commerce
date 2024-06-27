// const { OrderDetails } = require("../../models/orderDetails")
// const { rPut } = require("../../repository/rPut")


// const cancelRefundUpdateOrderDetails={
//     Refund:async(req)=>{
//         const modelNames='OrderDetails'
//         const filter={_id:req.body.orderId}
//         const orderDetail=await OrderDetails.findOne(filter)
//         const domain={
//             orderId:orderDetail.orderId,
//             infolog:orderDetail.infolog,
//             paymentTransactionId:orderDetail.paymentTransactionId,
//             orderStatus:'İptal Edildi',
//             cargoStatus:orderDetail.cargoStatus,
//         }
//         rPut(modelNames,filter,domain)
//         return
//     },
//     Cancel:async(req)=>{
//         const modelName='OrderDetails'
        
//         const orderDetail=await OrderDetails.find({orderId:req.body.orderId})
//         for(let i=0;i<orderDetail.length;i++){
//             let detail=await OrderDetails.findOne({_id:orderDetail[i]._id})
//             const filter={_id:detail._id}
//             let domain={
//                 orderId:detail.orderId,
//                 infolog:detail.infolog,
//                 paymentTransactionId:detail.paymentTransactionId,
//                 orderStatus:'İptal Edildi',
//                 cargoStatus:detail.cargoStatus,
//             }
//             rPut(modelName,filter,domain)
//         }
//         return
//     }
    
// }
// module.exports={cancelRefundUpdateOrderDetails}