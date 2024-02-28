const { Carts, PaymentFailed, PaymentSuccess, OrderDetails, Order } = require("../helper/models")

const CompletePayment=async(result)=>{
    if(result?.status==="success"){
        await Carts.updateOne({_id:result.basketId},{$set:{
            completed:true
        }})
        await PaymentSuccess.create({
            status:result.status,
            cardId:result?.basketId,
            conversationId:result?.conversationId,
            currency:result?.currency,
            paymentId:result?.paymentId,
            price:result?.price,
            paidPrice:result?.paidPrice,
            itemTransactions: result?.itemTransactions.map(item=>{
                return {
                    itemId:item?.itemId,
                    paymentTransactionId:item?.paymentTransactionId,
                    price:item?.price,
                    paidPrice:item?.paidPrice
                }
            }),
            log:result
        })
        const orderDetails=await OrderDetails.find({order:result.basketId})
        for(let i=0;i<orderDetails.length;i++){
            orderDetails[i].paymentTransactionId=result?.itemTransactions[i]?.paymentTransactionId
            orderDetails[i].save()
        }
        const order=await Order.findOne({_id:result.basketId})
        order.paymentId=result?.paymentId
        order.completed=true
        order.save()
    }else{
        await PaymentFailed.create({
            status:result?.status,
            conversationId:result?.conversationId,
            errorCode:result?.errorCode,
            errorMessage:result?.errorMessage,
            log:result
        })
    }
}
module.exports={
    CompletePayment
}