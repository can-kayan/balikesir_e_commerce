
const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')
const {adminAddToSet}=require('../roleService/adminService')
const {companyAddToSet}=require('../roleService/companyService')
const {userAddToSet}=require('../roleService/userService')
const {cAddToSetAdmin,cAddToSetCompany,cAddToSetUser}=require('../condition/cAddToSet')
const { decrypt } = require('../../securityMiddleware/crypto')
const vAddToSet=async (req,res)=>{
    try{
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cAddToSetAdmin.includes(adus)){
                    adminAddToSet[adus](req,res)
                    return
                }else return res.send(errorMessages.accessDenied)
                
            case process.env.ONE:
                if(cAddToSetCompany.includes(adus)){       
                    companyAddToSet[adus](req,res)
                    return
                }else return res.send(errorMessages.accessDenied)

            case process.env.TWO: 
                if(cAddToSetUser.includes(adus)){
                    userAddToSet[adus](req,res)
                    return
                }else return res.send(errorMessages.accessDenied)
            default:
                return res.status(401).send(errorMessages.authorizationNotValid)
        }
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }
}
module.exports={vAddToSet}