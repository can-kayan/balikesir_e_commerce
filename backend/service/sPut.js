const errorMessages=require('../messageHandling/ErrorHandling')
const { cModels } = require('../controller/cModels')
const {rPut } = require('../repository/rPut')
const { cAdminModel } = require('../controller/cAdminModel')
const sPut=async(req,res,filter)=>{
    try{
        const modelNames=req.params.modelName
        const updateData= await  cModels[modelNames](req,res);
        const result = await rPut(modelNames,filter,updateData)
        return result
    }catch{return errorMessages.anUnexpectedErrorOccurred}
}
const sAdminPut=async(req,res,filter)=>{
    try{
        const modelNames=req.params.modelName
        const updateData= await  cAdminModel[modelNames](req,res);
        const result = await rPut(modelNames,filter,updateData)
        return result
    }catch{return errorMessages.anUnexpectedErrorOccurred}
}
module.exports={sPut,sAdminPut}