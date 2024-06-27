const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')
const {adminPost}=require('../roleService/adminService')
const {companyPost}=require('../roleService/companyService')
const {userPost}=require('../roleService/userService')
const {cPostAdmin,cPostCompany,cPostUser}=require('../condition/cPost')
const { decrypt } = require('../../securityMiddleware/crypto')

const vPost=async (req,res)=>{
    // try{
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cPostAdmin.includes(adus)){
                    console.log('geliyi mi')
                    adminPost[adus](req,res)     
                    return               
                }else return res.status(401).send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cPostCompany.includes(adus)){
                    companyPost[adus](req,res)        
                    return             
                }else return res.status(401).send(errorMessages.accessDenied) 

            case process.env.TWO: 
                if(cPostUser.includes(adus)){
                    userPost[adus](req,res)
                    return 
                }else return res.status(401).send(errorMessages.accessDenied) 
            default:
                return res.status(401).send(errorMessages.authorizationNotValid) 
        }
    // }catch{
    //     return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    // }
}
module.exports={vPost}