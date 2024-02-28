const Iyzipay = require("iyzipay")
const { User, PaymentSuccess } = require("../../helper/models")
const ApiError = require("../../messageHandling/ApiError")
const { refundPayments } = require("../../service/iyzico/methods/refund-payments")
const { cancelPayment } = require("../../service/iyzico/methods/cancel-payments")
const { nanoid } = require("nanoid")
const { decrypt } = require("../../securityMiddleware/crypto")
const reasonEnum =["double_payment","buyer_request","fraud","other"]

const refund=async(req,res)=>{
    const {paymentTransactionId}=req.params
    const reasonObj={}
    const {reason,description}=req.body
    
    const users=await User.findOne({infolog:req.decoded.id})
    if(!paymentTransactionId){
       throw new ApiError("paymentTransactionId is required",400,"paymentTransactionIdRequired")

    }
    if(reason && description){
        if(!reasonEnum.includes(reason)){
            throw new ApiError("Invalid cancel payment reason",400,"invalidCancelPayment")
        }
        reasonObj.reason=reason
        reasonObj.description=description
    }
    const payment=await PaymentSuccess.findOne({
        "itemTransactions.paymentTransactionId":paymentTransactionId
    })
    const currentItemTransaction=payment.itemTransactions.find((itemTransaction,index)=>{
        return itemTransaction.paymentTransactionId===paymentTransactionId
    })
    const result=await refundPayments({
        locale:users?.locale,
        conversationId:nanoid(),
        paymentTransactionId:currentItemTransaction?.paymentTransactionId,
        price:req.body?.refundPrice || currentItemTransaction?.paidPrice,
        curreny:Iyzipay.CURRENCY.TRY,
        ip:req.user?.ip,
        ...reasonObj
    })
    res.json(result)
}
const cancel=async(req,res)=>{

    const {reason,description}=req.body
    const {paymentSuccessId}=req.params
    const reasonObj={}
    const users=await User.findOne({infolog:req.decoded.id})
    if(!paymentSuccessId){
        throw new ApiError("Payment SuccessId is required",400,"paymentSuccessIdRequired")
    }
    if(reason && description){
        if(!reasonEnum.includes(reason)){
            throw new ApiError("Invalid cancel payment reason",400,"invalidCancelPayment")
        }
        reasonObj.reason=reason
        reasonObj.description=description
    }
    const payment=await PaymentSuccess.findOne({paymentId:paymentSuccessId})
    const result=await cancelPayment({
        locale:users.locale,
        conversationId:nanoid(),
        paymentId:payment?.paymentId,
        ip:decrypt(users?.ip),
        ...reasonObj
    })
    res.json(result)
}
module.exports={
    refund,
    cancel
}