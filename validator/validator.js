const express=require('express');
const router=express.Router();
const { vGet, vPost, vAddToSet, vPut, vSet, vPull, vDelete } = require('../helper/validations');
const { sLogin } = require('../service/sLogin');
const { sCreated } = require('../service/sCreated');
const { sPublic } = require('../service/sPublic');
const { vAreaSet } = require('../middleware/validation/vAreaSet');
const { Session } = require('../securityMiddleware/Session');
const { withNewCardNotSaveCard} = require('../middleware/iyzicoServices/payment');
const { lastcheckout, startcheckout } = require('../middleware/iyzicoServices/checkout');
const { refund, cancel } = require('../middleware/iyzicoServices/refundAndCancelation');
const { lastThreedsPayment, startThreedsPayment } = require('../middleware/iyzicoServices/threedsPayment');
const { installments, installmentforBasked } = require('../middleware/iyzicoServices/installment');
router.get(`/:modelName`,Session, (req,res)=>{vGet(req,res)})

router.post(`/new=:modelName`,Session ,(req,res)=>{vPost(req,res)})

router.get(`/public/:modelName`,(req,res)=>{sPublic(req,res)})
router.post(`/:modelName/:id`,Session,(req,res)=>{vAddToSet(req,res)})
router.put(`/update=:modelName`,Session, (req,res)=>{vPut(req,res)})
router.put(`/:modelName/:modelid/:areaName`,Session,(req,res)=>{vAreaSet(req,res)})
router.put(`/oneSet=:modelName=:modelId/:arrayName=:arrayId`,Session,(req,res)=>{vSet(req,res)})
router.delete(`/pull=:modelName/:id`,Session,(req,res)=>{vPull(req,res)})
router.delete(`/del=:modelName`,Session, (req,res)=>{vDelete(req,res)})

router.post(`/login`, (req,res)=>{sLogin(req,res)})
router.post(`/created`, (req,res)=>{sCreated(req,res)})

//cancel whole  payment
router.post("/payments/:paymentSuccessId/cancel",Session,async(req,res)=>{
    cancel(req,res)
})

//checkout form complete payment
router.post("/payments/checkout/complete/payment/result",(req,res)=>{
   lastcheckout(req,res)
})
//checkout form initializer
router.post("/payment/checkout/forms/:cartId",Session,async(req,res)=>{
    startcheckout(req,res)
})
//fiyata göre taksit kontrolü
router.post("/installments",Session,async(req,res)=>{
    installments(req,res)
})
//sepete göre taksit kontrolü
router.post("/installments/card/:cardId",Session,async(req,res)=>{
    installmentforBasked(req,res)
})
//yeni kart ile ödeme oluştur kart kaydetme
router.post("/payments/:cartId/with-new-card",Session,async(req,res)=>{
    withNewCardNotSaveCard(req,res)
})
router.post("/payments/:paymentTransactionId/refund",Session,async(req,res)=>{
    refund(req,res)
 })
 router.post("/threeds/payments/complete",async(req,res)=>{
    lastThreedsPayment(req,res)
})
// 3dödeme
router.post("/threeds/payments/:cartId/with-new-card",Session,async(req,res)=>{
    startThreedsPayment(req,res)
    
})
//yeni kart ile ödeme oluştur kart kaydet
// router.post("/payments/:cartId/with-register-card",Session,async(req,res)=>{
//    withNewCardSaveCard(req)
    
// })
//kayıtlı kart ile ödeme yapma
// router.post("/payments/:cardId/:cartIndex/with-registered-card-index",Session,async(req,res)=>{
//     const {cartIndex}=req.params
//     if(!cartIndex){
//         throw new ApiError("Card index is reuired",400,"cardIndexRequired")

//     }
//     if(!req.user?.cardUserKey){
//         throw new ApiError("No registered card available",400,"cardAvailable")
//     }
//     const cards=await getUserCards({
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         cardUserKey:req.user?.cardUserKey
//     })
//     const index=parseInt(cartIndex)
//     if(index >=cards?.cardDetails?.length){
//         throw new ApiError("Card doesnt exists",400,"cardIndexInvalid")
//     }
//     const {cardToken}=cards?.cardDetails[index]
//     if(!req.params?.cardId){
//         throw new ApiError("Card id is reuired",400,"cardIdRequired")
//     }
//     const cart=await Carts.findOne({_id:req.params?.cardId}).populate("buyer").populate("products")
//     console.log(cart)
//     if(!cart){
//         throw new ApiError("Card not found",404,"cardNotFound")

//     }
//     if(cart?.completed){
//         throw new ApiError("Card is completed",400,"cardIsCompleted")
//     }
//     const card={
//         cardToken,
//         cardUserKey:req.user?.cardUserKey
//     }
//     const paidPrice=cart.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
//     const data={
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         price:paidPrice,
//         paidPrice:paidPrice,
//         currency:Iyzipay.CURRENCY.TRY,
//         installments:'1',
//         basketId:String(cart?._id),
//         paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
//         paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
//         paymentCard:card,
//         buyer:{
//             id:String(req.user._id),
//             name:req.user?.name,
//             surname:req.user?.surname,
//             gsmNumber:req.user?.phoneNumber,
//             email:req.user?.email,
//             identityNumber:req.user?.identityNumber,
//             lastLoginDate: moment(req.user?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationDate: moment(req.user?.createAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationAddress:req.user?.address,
//             ip:req.user?.ip,
//             city:req.user?.city,
//             country:req.user?.country,
//             zipCode:req.user?.zipCode
//         },
//         shippingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         billingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         basketItems:cart.products.map((product,index)=>{
//             return {
//                 id:String(product?._id),
//                 name:product?.name,
//                 category1:product.categories[0],
//                 category2:product.categories[1],
//                 itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
//                 price:product?.price
//             }
//         })
//     }
//     let result =await createPayment(data)
//     if(!req.user?.cardUserKey){
//         const user=await User.findOne({_id:req.user?._id})
//         user.cardUserKey=result?.cardUserKey
//         await user.save()
//     }
//     await CompletePayment(result)
//     res.json(result)
    
// })

//kayıtlı kart ile ödeme yapma token
// router.post("/payments/:cardId/with-registered-card-token",Session,async(req,res)=>{
//     const {cardToken}=req.body
//     if(!cardToken){
//         throw new ApiError("Card token is reuired",400,"cardTokenRequired")
//     }
//     if(!req.user?.cardUserKey){
//         throw new ApiError("No registered card available",400,"cardAvailable")
//     }
//     if(!req.params?.cardId){
//         throw new ApiError("Card id is reuired",400,"cardIdRequired")
//     }
//     const cart=await Carts.findOne({_id:req.params?.cardId}).populate("buyer").populate("products")
//     console.log(cart)
//     if(!cart){
//         throw new ApiError("Card not found",404,"cardNotFound")

//     }
//     if(cart?.completed){
//         throw new ApiError("Card is completed",400,"cardIsCompleted")
//     }
//     const card={
//         cardToken,
//         cardUserKey:req.user?.cardUserKey
//     }
//     const paidPrice=cart.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
//     const data={
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         price:paidPrice,
//         paidPrice:paidPrice,
//         currency:Iyzipay.CURRENCY.TRY,
//         installments:'1',
//         basketId:String(cart?._id),
//         paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
//         paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
//         paymentCard:card,
//         buyer:{
//             id:String(req.user._id),
//             name:req.user?.name,
//             surname:req.user?.surname,
//             gsmNumber:req.user?.phoneNumber,
//             email:req.user?.email,
//             identityNumber:req.user?.identityNumber,
//             lastLoginDate: moment(req.user?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationDate: moment(req.user?.createAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationAddress:req.user?.address,
//             ip:req.user?.ip,
//             city:req.user?.city,
//             country:req.user?.country,
//             zipCode:req.user?.zipCode
//         },
//         shippingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         billingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         basketItems:cart.products.map((product,index)=>{
//             return {
//                 id:String(product?._id),
//                 name:product?.name,
//                 category1:product.categories[0],
//                 category2:product.categories[1],
//                 itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
//                 price:product?.price
//             }
//         })
//     }
//     let result =await createPayment(data)
//     if(!req.user?.cardUserKey){
//         const user=await User.findOne({_id:req.user?._id})
//         user.cardUserKey=result?.cardUserKey
//         await user.save()
//     }
//     await CompletePayment(result)
//     res.json(result)
    
// })

//kart ekleme
// router.post("/post/cardstorage/card",Session,async(req,res)=>{
//     const {card}=req.body
//     console.log('users',req.body)
//     const users=await User.findOne({infolog:req.decoded.id})
//     const infolog=await Infolog.findOne({_id:req.decoded.id})
//     let result=await createUserCard(req,{
//         card,
//         email:decrypt(infolog?.email),
//         externalId:nanoid(),
//         locale:users.locale,
//         conversationId:nanoids(),
        
       
//         ...users?.cardUserKey && {
//             cardUserKey:users.cardUserKey
//         },
        
//     })
//     console.log('result',result)
//     if(!users?.cardUserKey){
//         if(result?.status==="success"&& result?.cardUserKey){
//             const user=await User.findOne({
//                 _id:user?._id
//             })
//             user.cardUserKey=result?.cardUserKey
//             console.log(user.cardUserKey)
//             await user.save()
//         }
//     }
//     res.send(result)
// })
// //kart okuma
// router.get("/get/cards",Session,async(req,res)=>{
//     if(!req.user?.cardUserKey){
//         res.send(errorHandling.userHashNoCard)
//     }
//     else{
//         let cards=await getUserCards({
//             locale:req.user.locale,
//             conversationId:nanoid(),
//             cardUserKey:req.user?.cardUserKey
//         })
//         res.status(200).json(cards)
//     }
    
// })
//Kart silme -token
// router.delete("/cards/delete-by-token",Session,async(req,res)=>{
//     const {cardToken}=req.body
//     if(!cardToken){
//         throw new ApiError("Card token is required",400,"cardTokenRequired")

//     }
//     let deleteresult=await deleteUserCard({
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         cardUserKey:req.user?.cardUserKey,
//         cardToken:cardToken
//     })
//     res.status(200).json(deleteresult)
// })
// //kart silme index
// router.delete("/cards/:cardIndex/delete-by-index",Session,async(req,res)=>{
//     if(!req.params?.cardIndex){
//         throw new ApiError("Card Index is required",400,"cardIndexrequired")

//     }
//     let cards=await getUserCards({
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         cardUserKey:req.user?.cardUserKey

//     })
//     const index=parseFloat(req.params?.cardIndex);
//     if(index>=cards?.cardDetails.length){
//         throw new ApiError("Card doesnt exists, check index number",400,"cardIndexInvalid")
//     }
//     const {cardToken}=cards?.cardDetails[index]
//     let deleteresult=await deleteUserCard({
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         cardUserKey:req.user?.cardUserKey,
//         cardToken:cardToken
//     })
//     res.json(deleteresult)
// })

//kartı kaydet  3dödeme
// router.post("/threeds/payments/:cartId/with-new-card/register-card",Session,async(req,res)=>{
//     const {card}=req.body
//     if(!card){
//         throw new ApiError("Card is reuired",400,"cardRequired")

//     }
//     if(!req.params?.cartId){
//         throw new ApiError("Card id is reuired",400,"cardIdRequired")
//     }
//     const cart=await Carts.findOne({_id:req.params?.cartId}).populate("buyer").populate("products")
//     console.log(cart)
//     if(!cart){
//         throw new ApiError("Card not found",404,"cardNotFound")

//     }
//     if(cart?.completed){
//         throw new ApiError("Card is completed",400,"cardIsCompleted")
//     }
//     if(req.user.cardUserKey){
//         card.cardUserKey=req.user?.cardUserKey
//     }
//     card.registerCard="1"
//     const paidPrice=cart.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
//     const data={
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         price:paidPrice,
//         paidPrice:paidPrice,
//         currency:Iyzipay.CURRENCY.TRY,
//         installments:'1',
//         basketId:String(cart?._id),
//         paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
//         paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
//         callbackUrl:`${process.env.END_POINT}/threeds/payments/complete`,
//         paymentCard:card,
//         buyer:{
//             id:String(req.user._id),
//             name:req.user?.name,
//             surname:req.user?.surname,
//             gsmNumber:req.user?.phoneNumber,
//             email:req.user?.email,
//             identityNumber:req.user?.identityNumber,
//             lastLoginDate: moment(req.user?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationDate: moment(req.user?.createAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationAddress:req.user?.address,
//             ip:req.user?.ip,
//             city:req.user?.city,
//             country:req.user?.country,
//             zipCode:req.user?.zipCode
//         },
//         shippingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         billingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         basketItems:cart.products.map((product,index)=>{
//             return {
//                 id:String(product?._id),
//                 name:product?.name,
//                 category1:product.categories[0],
//                 category2:product.categories[1],
//                 itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
//                 price:product?.price
//             }
//         })
//     }
//     let result =await initializePayment(data)
//     const html=Buffer.from(result?.threeDSHtmlContent,'base64').toString()
//     // await CompletePayment(result)
//     res.send(html)
    
// })

// //hazırda olan 3dödeme index
// router.post("/threeds/payments/:cartId/:cartIndex/with-registered-card-index",Session,async(req,res)=>{
//     const {cartIndex}=req.params
//     if(!cartIndex){
//         throw new ApiError("Card index is reuired",400,"cardIndexRequired")

//     }
//     if(!req.user?.cardUserKey){
//         throw new ApiError("No registered card available",400,"cardAvailable")
//     }
//     const cards=await getUserCards({
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         cardUserKey:req.user?.cardUserKey
//     })
//     const index=parseInt(cartIndex)
//     if(index >=cards?.cardDetails?.length){
//         throw new ApiError("Card doesnt exists",400,"cardIbdexInvalid")
//     }
//     const {cardToken}=cards?.cardDetails[index]
//     const card={
//         cardToken,
//         cardUserKey:req.user?.cardUserKey
//     }
//     if(!req.params?.cartId){
//         throw new ApiError("Card id is reuired",400,"cardIdRequired")
//     }
//     const cart=await Carts.findOne({_id:req.params?.cartId}).populate("buyer").populate("products")
//     console.log(cart)
//     if(!cart){
//         throw new ApiError("Card not found",404,"cardNotFound")

//     }
//     if(cart?.completed){
//         throw new ApiError("Card is completed",400,"cardIsCompleted")
//     }
//     if(req.user.cardUserKey){
//         card.cardUserKey=req.user?.cardUserKey
//     }
//     const paidPrice=cart.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
//     const data={
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         price:paidPrice,
//         paidPrice:paidPrice,
//         currency:Iyzipay.CURRENCY.TRY,
//         installments:'1',
//         basketId:String(cart?._id),
//         paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
//         paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
//         callbackUrl:`${process.env.END_POINT}/threeds/payments/complete`,
//         paymentCard:card,
//         buyer:{
//             id:String(req.user._id),
//             name:req.user?.name,
//             surname:req.user?.surname,
//             gsmNumber:req.user?.phoneNumber,
//             email:req.user?.email,
//             identityNumber:req.user?.identityNumber,
//             lastLoginDate: moment(req.user?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationDate: moment(req.user?.createAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationAddress:req.user?.address,
//             ip:req.user?.ip,
//             city:req.user?.city,
//             country:req.user?.country,
//             zipCode:req.user?.zipCode
//         },
//         shippingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         billingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         basketItems:cart.products.map((product,index)=>{
//             return {
//                 id:String(product?._id),
//                 name:product?.name,
//                 category1:product.categories[0],
//                 category2:product.categories[1],
//                 itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
//                 price:product?.price
//             }
//         })
//     }
//     let result =await initializePayment(data)
//     const html=Buffer.from(result?.threeDSHtmlContent,'base64').toString()
//     // await CompletePayment(result)
//     res.send(html)
    
// })

//hazırda olan 3dödeme token
// router.post("/threeds/payments/:cartId/with-registered-card-token",Session,async(req,res)=>{
//     let {cardToken}=req.body
//     if(!cardToken){
//         throw new ApiError("Card index is reuired",400,"cardIndexRequired")

//     }
//     if(!req.user?.cardUserKey){
//         throw new ApiError("No registered card available",400,"cardAvailable")
//     }
//     const card={
//         cardToken,
//         cardUserKey:req.user?.cardUserKey
//     }
//     if(!req.params?.cartId){
//         throw new ApiError("Card id is reuired",400,"cardIdRequired")
//     }
//     const cart=await Carts.findOne({_id:req.params?.cartId}).populate("buyer").populate("products")
//     console.log(cart)
//     if(!cart){
//         throw new ApiError("Card not found",404,"cardNotFound")

//     }
//     if(cart?.completed){
//         throw new ApiError("Card is completed",400,"cardIsCompleted")
//     }
//     if(req.user.cardUserKey){
//         card.cardUserKey=req.user?.cardUserKey
//     }
//     const paidPrice=cart.products.map((product)=>product.price).reduce((a,b)=>a+b,0)
//     const data={
//         locale:req.user.locale,
//         conversationId:nanoid(),
//         price:paidPrice,
//         paidPrice:paidPrice,
//         currency:Iyzipay.CURRENCY.TRY,
//         installments:'1',
//         basketId:String(cart?._id),
//         paymentChannel:Iyzipay.PAYMENT_CHANNEL.WEB,
//         paymentGroup:Iyzipay.PAYMENT_GROUP.PRODUCT,
//         callbackUrl:`${process.env.END_POINT}/threeds/payments/complete`,
//         paymentCard:card,
//         buyer:{
//             id:String(req.user._id),
//             name:req.user?.name,
//             surname:req.user?.surname,
//             gsmNumber:req.user?.phoneNumber,
//             email:req.user?.email,
//             identityNumber:req.user?.identityNumber,
//             lastLoginDate: moment(req.user?.updateAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationDate: moment(req.user?.createAt).format("YYYY-MM-DD HH:mm:ss"),
//             registrationAddress:req.user?.address,
//             ip:req.user?.ip,
//             city:req.user?.city,
//             country:req.user?.country,
//             zipCode:req.user?.zipCode
//         },
//         shippingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         billingAddress:{
//             contactName:req.user?.name+" "+req.user?.surname,
//             city:req.user?.city,
//             country:req.user?.country,
//             address:req.user?.address,
//             zipCode:req.user?.zipCode
//         },
//         basketItems:cart.products.map((product,index)=>{
//             return {
//                 id:String(product?._id),
//                 name:product?.name,
//                 category1:product.categories[0],
//                 category2:product.categories[1],
//                 itemType:Iyzipay.BASKET_ITEM_TYPE[product?.itemType],
//                 price:product?.price
//             }
//         })
//     }
//     let result =await initializePayment(data)
//     const html=Buffer.from(result?.threeDSHtmlContent,'base64').toString()
//     // await CompletePayment(result)
//     res.send(html)
    
// })

module.exports=router;