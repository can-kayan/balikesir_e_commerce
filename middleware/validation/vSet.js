const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')

const {adminSet}=require('../roleService/adminService')
const {companySet}=require('../roleService/companyService')
const {userSet}=require('../roleService/userService')
const {cSetAdmin,cSetDomainAdmin,cSetCompany,cSetDomainCompany,cSetUser,cSetDomainUser}=require('../condition/cSet')
const { decrypt } = require('../../securityMiddleware/crypto')

const vSet=async (req,res)=>{
    try{
        const adus=req.params.modelName
        const domain=req.params.arrayName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cSetAdmin.includes(adus) && cSetDomainAdmin.includes(domain)){
                    adminSet[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cSetCompany.includes(adus) && cSetDomainCompany.includes(domain)){
                    companySet[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
return
            case process.env.TWO: 
                if(cSetUser.includes(adus) && cSetDomainUser.includes(domain)){
                    userSet[adus](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            
            default:
                return res.status(401).send(errorMessages.authorizationNotValid) 
        }   
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }
}
module.exports={vSet}