const { default: mongoose } = require("mongoose");

const rAreaSet=async(modelName,modelId,domainInfo)=>{
    const Model=mongoose.model(modelName)
    const item = await Model.findByIdAndUpdate(modelId,
        {$set:domainInfo},{new:true})
    if(!item)
        return
    return item
}
module.exports={rAreaSet}