const {CancelationOrder}=require('../model/company/cancelationOrder') 
const {Company}=require('../model/company/company') 
const {Discount}=require('../model/company/discount') 
const {OrderDetails}=require('../model/company/orderDetails') 
const {PastProductPrice}=require('../model/company/pastProductPrice') 
const {Product}=require('../model/company/product') 
const {ProductRating}=require('../model/company/productRating') 
const {Carts}=require('../model/iyzico/carts') 
const {PaymentFailed}=require('../model/iyzico/payment-fail') 
const {PaymentSuccess}=require('../model/iyzico/payment-success') 
const {Admin}=require('../model/site/admin') 
const {Category}=require('../model/site/category') 
const {Infolog}=require('../model/site/infolog') 
const {MainCategory}=require('../model/site/mainCategory') 
const {Message}=require('../model/site/message') 
const {Address}=require('../model/user/address') 
const {Basked}=require('../model/user/basked') 
const {DeletedFromCart}=require('../model/user/deletedFromCart') 
const {Favori}=require('../model/user/favori') 
const {Order}=require('../model/user/order') 
const {ProductViewingHistory}=require('../model/user/productViewingHistory') 
const {User}=require('../model/user/user') 


module.exports={
    CancelationOrder
    ,Company
    ,Discount
    ,OrderDetails
    ,PastProductPrice
    ,Product
    ,ProductRating
    ,Carts
    ,PaymentFailed
    ,PaymentSuccess
    ,Admin
    ,Category
    ,Infolog
    ,MainCategory
    ,Message
    ,Address
    ,Basked
    ,DeletedFromCart
    ,Favori
    ,Order
    ,ProductViewingHistory
    ,User
  
}