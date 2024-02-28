const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')
const {adminPull}=require('../roleService/adminService')
const {companyPull}=require('../roleService/companyService')
const {userPull}=require('../roleService/userService')
const {cPullAdmin,cPullCompany,cPullUser}=require('../condition/cPull')
const { decrypt } = require('../../securityMiddleware/crypto')

const vPull=async (req,res)=>{
    try{
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cPullAdmin.includes(adus)){
                    adminPull[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cPullCompany.includes(adus)){
                    companyPull[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 

            case process.env.TWO: 
                if(cPullUser.includes(adus)){
                    userPull[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            
            default:
                return res.status(401).send(errorMessages.authorizationNotValid) 
        } 
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }
}
module.exports={vPull}