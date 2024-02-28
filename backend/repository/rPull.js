const { default: mongoose } = require("mongoose");

const rPull=async(modelName,modelId,domainInfo)=>{
    const Model=mongoose.model(modelName)
    const adminitem = await Model.findByIdAndUpdate(modelId,
        {$pull:domainInfo},{new:true});
    if(!adminitem)
        return
    return adminitem
}
module.exports={rPull}