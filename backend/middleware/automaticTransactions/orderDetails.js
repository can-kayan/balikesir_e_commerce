const { Product, Basked } = require('../../helper/models')
const {rPost}=require('../../repository/rPost')
const orderDetails = async(req,toList)=>{
    try{
        for(let i=0;i<req.body.basked.length;i++){
            let order=toList._id
            let basked=await Basked.findOne({_id:toList.basked[i]})
            let product=await Product.findOne({_id:basked.product})
            let infolog=product.infolog
            let modelName='OrderDetails'
            const ret={order,infolog,user:req.decoded.id}
            rPost(modelName, ret)
        }
            return 
    }catch(error){
        return console.log(error)
    }
}



module.exports={orderDetails}