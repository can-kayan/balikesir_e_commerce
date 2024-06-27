const { cModels } = require('../controller/cModels')
const errorMessages=require('../messageHandling/ErrorHandling')
const {Infolog}=require('../helper/models')
const { rPost } = require('../repository/rPost')
const { decrypt } = require('../securityMiddleware/crypto')

const conditionCalculater=async(mail)=>{
    let infolog=await Infolog.find()
    let result=infolog.map(infolog=>decrypt(infolog.email)==mail?false:true)
    let returns=false
    for(let i=0;i<result.length;i++){
        if(!result[i]){
            returns= true
            break;
        }
    }
    return returns
}

const sCreated=async (req,res)=>{
    // try{
        
        if(!await conditionCalculater(req.body.email)){
            
        const modelName="Infolog"
        const domainInfo=await cModels[modelName](req,res)
        if(!domainInfo){
            return res.json({success:false,message:errorMessages.authorizationNotValid})
        }
        const ghostitem = await rPost(modelName,domainInfo)
        if(!ghostitem) { return res.json({success:false,message:errorMessages.anUnexpectedErrorOccurred}) }
        return res.send(ghostitem)
    }else{
        return res.send(errorMessages.missingParameter)
    }
    // }catch(error){
    //     return console.error(errorMessages.anUnexpectedErrorOccurred)
    // }
}

module.exports={sCreated}