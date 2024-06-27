
const {Discount,Product}=require('../../helper/models')
const totalPrice=async(req)=>{
    const product=await Product.findOne({_id:req.body.product})
    const discounts=await Discount.findOne({_id:await product.discount})
    let discountProduct=product.price
    if(discounts!=null)
    {const discountPercentage=await discounts.discount
    discountProduct=(await product.price) - ((await product.price) * (discountPercentage/100))
    }   
    let quantityPrices=discountProduct * req.body.quantity
    return quantityPrices
}
module.exports={totalPrice}