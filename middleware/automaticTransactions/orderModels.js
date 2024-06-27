const { User, Basked } = require("../../helper/models")

const buyer=async(req)=>{
    const user=await User.findOne({infolog:req.decoded.id})
    return user._id
}
const product=async(req)=>{
    let product=[]
    for(let i=0;i<req.body.basked.length;i++){
        let basked=await Basked.findOne({_id:req.body.basked[i]})
        product.push(basked.product._id)
    }
    return product
}
module.exports={
    buyer,
    product
}