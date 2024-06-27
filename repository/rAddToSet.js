const { default: mongoose } = require("mongoose");
const errorMessages = require("../messageHandling/ErrorHandling");
const rAddToSet=async(modelName,modelId,domainInfo)=>
    {
        const Model=mongoose.model(modelName)
        const item = await Model.findByIdAndUpdate(modelId,
         {$addToSet:domainInfo},{new:true});
        if(!item)
            return errorMessages.FileContainsNoData
        return item
    }
module.exports={rAddToSet}