const { default: mongoose } = require("mongoose");
const errorMessages = require("../messageHandling/ErrorHandling");
const rPost=async(modelName,domainInfo)=>{
    console.log('burdamı')
    const Model =mongoose.model(modelName)
    console.log('yoksa burdamı')
    const posts = new Model(domainInfo)
    console.log('geriye bu kaldı')
    const postsitem = posts.save();
    if(!postsitem){
        return errorMessages.anUnexpectedErrorOccurred
    }
    else return postsitem
}
module.exports={rPost}