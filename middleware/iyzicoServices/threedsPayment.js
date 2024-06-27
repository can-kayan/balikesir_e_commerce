const { nanoid } = require("nanoid")
const ApiError = require("../../messageHandling/ApiError")
const { complatePayment, initializePayment } = require("../../service/iyzico/methods/threeds-payment")
const { CompletePayment } = require("../../securityMiddleware/payment")
const { Order, User, Infolog, Basked } = require("../../helper/models")
const Iyzipay = require("iyzipay")
const { decrypt } = require("../../securityMiddleware/crypto")
const { BaskedItems } = require("./payment")

const lastThreedsPayment=async(req,res)=>{
    if(!req.body?.paymentId){
        throw new ApiError("Payment id is required",400,"paymentIdRequired")

    }
    if(req.body.status!=="success"){
        throw new ApiError("Payment cant be starred because initialize is failed",400,"initializationFailed")

    }
    const data={
        locale:"tr",
        conversationId:nanoid(),
        paymentId:req.body.paymentId,
        conversationData:req.body.conversationData
    }
    const result=await complatePayment(data)
    await CompletePayment(result)
    res.status(200).json(result)
}
const startThreedsPayment=async(req,res)=>{
    let toList=await Order.findOne({_id:req.params.cartId})
    const {card}=req.body
    const users=await User.findOne({infolog:req.decoded.id})
    const infolog=await Infolog.findOne({_id:req.decoded.id})
    if(!card){
        throw new ApiError("Card is reuired",400,"cardRequired")

    }
    if(!req.params?.cartId){
        throw new ApiError("Card id is reuired",400,"cardIdRequired")
    }
    if(!toList){
        throw new ApiError("Card not found",404,"cardNotFound")

    }
    if(toList?.completed){
        throw new ApiError("Card is completed",400,"cardIsCompleted")
    }

    card.registerCard="0"
    let paidPrice=0
    for(let i=0;i<toList.basked.length;i++){
        let basked=await Basked.findOne({_id:toList.basked[i]})
        paidPrice+=basked.totalPrice
    }
    const data={
        locale:req.user.locale,
        conversationId:nanoid(),
        price:paidPrice,
        paidPrice:paidPrice,
        currency:Iyzipay.CURRENCY.TRY,
        installments:'1',
        basketId:String(toList?._id),
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl:`${process.env.END_POINT}/ec1/threeds/payments/complete`,
        paymentCard:card,
        buyer:{
            id:String(users._id),
            name:decrypt(users?.name),
            surname:decrypt(users?.surname),
            gsmNumber:decrypt(toList?.phoneNumber),
            email:decrypt(infolog?.email),
            identityNumber:decrypt(users?.identityNumber),
            // lastLoginDate: moment(users?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
            // registrationDate: moment(users?.createAt).format("YYYY-MM-DD HH:mm:ss"),
            registrationAddress:decrypt(toList.address),
            ip:decrypt(users?.ip),
            city:decrypt(toList?.city),
            country:decrypt(toList?.country),
            zipcode:decrypt(toList?.zipcode)
        },
        shippingAddress:{
            contactName:decrypt(users?.name)+" "+decrypt(users?.surname),
            city:decrypt(toList?.city),
            country:decrypt(toList?.country),
            address:decrypt(toList?.address),
            zipcode:decrypt(toList?.zipcode)
        },
        billingAddress:{
            contactName:decrypt(users?.name)+" "+decrypt(users?.surname),
            city:decrypt(toList?.city),
            country:decrypt(toList?.country),
            address:decrypt(toList?.address),
            zipcode:decrypt(toList?.zipcode)
        },
        basketItems:await BaskedItems(toList)
    }
    console.log(data)
    let result =await initializePayment(data)
    console.log(result)
    const html=Buffer.from(result?.threeDSHtmlContent,'base64').toString()
    // await CompletePayment(result)
    res.send(html)
}

module.exports={
    lastThreedsPayment,
    startThreedsPayment
}