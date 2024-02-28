const productRatingInCompanyId=async(req)=>{
    const product=await Order.findOne({_id:req.body.orderId})
    if(product){
        return product.infolog
    }
}
const productId=async(req)=>{
    try{
        const product=await Order.findOne({_id:req.body.orderId})
        let productIdArrays=[]
        for(let i =0;i<product.baskedId.length;i++){
            productIdArrays.push(product.baskedId[i].productId)
        }
        return productIdArrays
    }catch(error){console.log(error);}
}
module.exports={
    productRatingInCompanyId,
    productId
}