const mongoose = require("mongoose");
const errorMessages = require("../messageHandling/ErrorHandling");
const rDeleteMany=async (modelName,filter)=>{
    const mainModel = mongoose.model(modelName);
    const result =await mainModel.deleteMany(filter)
    if(result.deletedCount===0){return errorMessages.NotImplemented}
    return result
}
module.exports={rDeleteMany}