const { cAdminModel } = require('../controller/cAdminModel')
const { cModels } = require('../controller/cModels')
const errorMessages=require('../messageHandling/ErrorHandling')
const { rPost } = require('../repository/rPost')
const sPost=async(req,res)=>{
        // try{
            const modelName=req.params.modelName
            console.log('geliyirmii')
            const domainInfo=await cModels[modelName](req,res)
            
            let toList=await rPost(modelName,domainInfo)
            console.log('ay ay geldi')
            return toList
        // }catch(error){
        //     return errorMessages.anUnexpectedErrorOccurred
        // }
}
const sAdminPost=async(req,res)=>{
    try{
        const modelName=req.params.modelName
        const domainInfo=await cAdminModel[modelName](req,res)
        let toList=await rPost(modelName,domainInfo)
        return toList
    }catch(error){
        return errorMessages.anUnexpectedErrorOccurred
    }
}
module.exports={sAdminPost,sPost}