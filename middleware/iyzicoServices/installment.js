const { nanoid } = require("nanoid")
const { User, Basked, Order } = require("../../helper/models")
const ApiError = require("../../messageHandling/ApiError")
const { checkInstallment } = require("../../service/iyzico/methods/installmetns")

const installments=async(req,res)=>{
    const {binNumber,price}=req.body
    const users=await User.findOne({infolog:req.decoded.id})
    
    if(!binNumber || !price){
        throw new ApiError("Missing parameters",400,"missingParameter")

    }
    const result =await checkInstallment({
        locale:users.locale,
        conversationId:nanoid(),
        binNumber:binNumber,
        price:price
    })
    res.json(result)
}
const installmentforBasked=async(req,res)=>{
    const {binNumber}=req.body
    const {cardId}=req.params
    let toList=await Order.findOne({_id:req.params.cardId})
   
    if(!cardId){
        throw new ApiError("Card id is required",400,"cardIdrequired")
    }
    const cart =await Order.findOne({
        _id:cardId
    })
    let Price=0
    for(let i=0;i<toList.basked.length;i++){
        let basked=await Basked.findOne({_id:toList.basked[i]})
        Price+=basked.totalPrice
    }if(!binNumber || !Price){
        throw new ApiError("Missing parameters",400,"missingParameter")
    }
    const result =await checkInstallment({
        locale:req.user.locale,
        conversationId:nanoid(),
        binNumber:binNumber,
        price:Price
    })
    res.json(result)
}
module.exports={
    installments,
    installmentforBasked
}