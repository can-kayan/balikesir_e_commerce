const { cArray} = require('../controller/cArray')
const errorMessages=require('../messageHandling/ErrorHandling')
const {rAddToSet}=require('../repository/rAddToSet')
const sAddToSet=async (req,res)=>{
    try{
        const modelName=req.params.modelName
        const modelId=req.params.id
        const domainInfo=await cArray[modelName](req)
        
        const toList=await rAddToSet(modelName,modelId,domainInfo)
        return toList
    }catch(error){
        return errorMessages.anUnexpectedErrorOccurred
    }
}
module.exports={sAddToSet}