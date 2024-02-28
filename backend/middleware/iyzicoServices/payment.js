const Iyzipay = require("iyzipay")
const { User, Infolog, Order, Basked, Product, Category, MainCategory } = require("../../helper/models")
const ApiError = require("../../messageHandling/ApiError")
const { createPayment } = require("../../service/iyzico/methods/payments")
const nanoids = require("../../securityMiddleware/nanoid")
const { decrypt } = require("../../securityMiddleware/crypto")
const { CompletePayment } = require("../../securityMiddleware/payment")
const { nanoid } = require("nanoid")
const BaskedItems=async(to)=>{
    let baskedItem=[]
    
    for(let i=0;i<to.product.length;i++){
        for(let b=0;b<to.basked[i].quantity;b++){
            const products=await Product.findOne({_id:to.product[i]})
            // console.log('Productsss',products)
            const category1=await Category.findOne({_id:products.category})
            const category2=await MainCategory.findOne({_id:category1.mainCategory})
            baskedItem.push({
                id:String(products?._id),
                name:products?.name,
                category1:category1.name,
                category2:category2.name,
                itemType:Iyzipay.BASKET_ITEM_TYPE[products?.itemType],
                price:products?.price
            })
        }
        
    }
    return baskedItem
    
}
const withNewCardNotSaveCard=async(req,res)=>{
    let toList=await Order.findOne({_id:req.params.cartId})
    const {card}=req.body
    const users=await User.findOne({infolog:req.decoded.id})
    const infolog=await Infolog.findOne({_id:req.decoded.id})
    
    if(!card){
        throw new ApiError("Card is reuired",400,"cardRequired")

    }
    if(!toList){
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
        locale:users.locale,
        conversationId:nanoid(),
        price:paidPrice,
        paidPrice:paidPrice,
        currency:Iyzipay.CURRENCY.TRY,
        installments:'1',
        basketId:String(toList?._id),
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:req.body.card,
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
     console.log('data',data)
    let result =  await createPayment(data)
    await CompletePayment(result)
   return res.send(result)
}
const withNewCardSaveCard=async(req,res)=>{
    let toList=await Order.findOne({_id:req.params.cartId})
    const {card}=req.body
    const users=await User.findOne({infolog:req.decoded.id})
    const infolog=await Infolog.findOne({_id:req.decoded.id})
    
    if(!card){
        throw new ApiError("Card is reuired",400,"cardRequired")

    }
    if(!toList){
        throw new ApiError("Card id is reuired",400,"cardIdRequired")
    }
    if(!toList){
        throw new ApiError("Card not found",404,"cardNotFound")

    }
    if(toList?.completed){
        throw new ApiError("Card is completed",400,"cardIsCompleted")
    }

    card.registerCard="1"
    let paidPrice=0
    for(let i=0;i<toList.basked.length;i++){
        let basked=await Basked.findOne({_id:toList.basked[i]})
        paidPrice+=basked.totalPrice
    }
    // const paidPrice=toList.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
    const data={
        locale:users.locale,
        conversationId:nanoid(),
        price:paidPrice,
        paidPrice:paidPrice,
        currency:Iyzipay.CURRENCY.TRY,
        installments:'1',
        basketId:String(toList?._id),
        paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard:req.body.card,
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
            zipCode:decrypt(toList?.zipCode)
        },
        shippingAddress:{
            contactName:decrypt(users?.name)+" "+decrypt(users?.surname),
            city:decrypt(toList?.city),
            country:decrypt(toList?.country),
            address:decrypt(toList?.address),
            zipCode:decrypt(toList?.zipCode)
        },
        billingAddress:{
            contactName:decrypt(users?.name)+" "+decrypt(users?.surname),
            city:decrypt(toList?.city),
            country:decrypt(toList?.country),
            address:decrypt(toList?.address),
            zipCode:decrypt(toList?.zipCode)
        },
        basketItems:await BaskedItems(toList)
        
    }
    let result =await createPayment(data)
    if(!users?.cardUserKey){
        users.cardUserKey=result?.cardUserKey
        await users.save()
    }
    await CompletePayment(result)
   return res.send(result)
}
module.exports={
    withNewCardNotSaveCard,
    withNewCardSaveCard,
    BaskedItems
}