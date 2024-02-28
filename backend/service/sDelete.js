
const errorMessages=require('../messageHandling/ErrorHandling')
const { rDeleteMany } = require('../repository/rDeleteMany')
const sDelete=async(req,res,filter)=>{
    try{
        const modelName=req.params.modelName
        const toList =await rDeleteMany(modelName,filter)
        return toList
    }catch(error){res.json({message:errorMessages.anUnexpectedErrorOccurred})}
}
module.exports={sDelete}

