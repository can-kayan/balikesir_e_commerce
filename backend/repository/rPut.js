const { default: mongoose } = require("mongoose");
const rPut=async(modelName,filter,updateData)=>{
    const mainModel = mongoose.model(modelName);
    const result = await mainModel.updateMany(filter,updateData)
    if(!result){ return }
    return result
}
module.exports={rPut}