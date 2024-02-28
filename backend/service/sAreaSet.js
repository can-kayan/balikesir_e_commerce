const { cAreaSet } = require('../controller/cAreaSet')
const errorMessages=require('../messageHandling/ErrorHandling')
const {rAreaSet } = require('../repository/rAreaSet')
const sAreaSet=async(req)=>{
    try{
        const {modelName,modelId,areaName}=req.params
        const domainInfo=await cAreaSet[modelName][areaName](req)
        console.log(domainInfo)
        const result = await rAreaSet(modelName,modelId,domainInfo)
        return result
    }catch{return errorMessages.anUnexpectedErrorOccurred}
}
module.exports={sAreaSet}