//model bilgisi =>  :modelName  /  veri eklenecek modelin id bilgisi => :id
const { cArray } = require('../controller/cArray')
const errorMessages=require('../messageHandling/ErrorHandling')
const { rPull } = require('../repository/rPull')
const sPull=async (req,res)=>{
    try{
        const modelName=req.params.modelName
        const modelId=req.params.id
        const domainInfo=await cArray[modelName](req,res)
        const toList = await rPull(modelName,modelId,domainInfo)
        return toList
    }catch(error){
        return errorMessages.anUnexpectedErrorOccurred
    }
}
module.exports={sPull}