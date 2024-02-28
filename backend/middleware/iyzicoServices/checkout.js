const { nanoid } = require("nanoid")
const { User, Order, Infolog, Basked } = require("../../helper/models")
const { getFormPayment, initializeCheckout } = require("../../service/iyzico/methods/checkout")
const { decrypt } = require("../../securityMiddleware/crypto")
const Iyzipay = require("iyzipay")
const moment = require('moment')
const { BaskedItems } = require("./payment")
const { CompletePayment } = require("../../securityMiddleware/payment")
const lastcheckout=async(req,res)=>{
    console.log('geiliyirmi',req)
    let result=await getFormPayment({
        locale:"tr",
        conversationId:nanoid(),
        token:req.body.token
    })
    
    // await CompletePayment(result)
    res.json(result)
}

const startcheckout=async(req,res)=>{
    let toList=await Order.findOne({_id:req.params.cartId})
    const users=await User.findOne({infolog:req.decoded.id})
    const infolog=await Infolog.findOne({_id:req.decoded.id})
    // if(!users?.cardUserKey){
    //     throw new ApiError("No registered card available",400,"cardAvailable")
    // }
    if(!req.params?.cartId){
        throw new ApiError("Card id is reuired",400,"cardIdRequired")
    }
    const cart=await Order.findOne({_id:req.params?.cartId})
    console.log(cart)
    if(!cart){
        throw new ApiError("Card not found",404,"cardNotFound")

    }
    if(cart?.completed){
        throw new ApiError("Card is completed",400,"cardIsCompleted")
    }
    
    let paidPrice=0
    for(let i=0;i<toList.basked.length;i++){
        let basked=await Basked.findOne({_id:toList.basked[i]})
        paidPrice+=basked.totalPrice
    }   
    const data={
        locale:users.locale,
            conversationId:nanoid(),
            price:paidPrice,
            paidPrice:paidPrice,
            currency:Iyzipay.CURRENCY.TRY,
            installments:'1',
            basketId:String(toList?._id),
            paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
            enabledInstallments:[1,2,3,4,6,9],
            paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
            callbackUrl:`${process.env.END_POINT}/ec1/payments/checkout/complete/payment/result`,
            ...req.user?.cardUserKey && {
                cardUserKey:req.user?.cardUserKey
            },
            buyer:{
                id:String(users._id),
                name:decrypt(users?.name),
                surname:decrypt(users?.surname),
                gsmNumber:decrypt(toList?.phoneNumber),
                email:decrypt(infolog?.email),
                identityNumber:decrypt(users?.identityNumber),
                lastLoginDate: moment(users?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
                registrationDate: moment(users?.createAt).format("YYYY-MM-DD HH:mm:ss"),
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
    let result =await initializeCheckout(data)
    console.log('result',result)
    const html=`<!DOCTYPEhtml>
    <html>
    <head>
    <title>Ödeme yap</title>
    <meta charset="UTF-8"/>
    ${result?.checkoutFormContent}
    </head>
    
    </html>`
    res.send(html)
    // const html=Buffer.from(result?.threeDSHtmlContent,'base64').toString()
    await CompletePayment(result)
    // res.send(html)
}
module.exports={
    startcheckout,
    lastcheckout
}