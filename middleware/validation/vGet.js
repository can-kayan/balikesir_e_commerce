const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')

const {adminGet}=require('../roleService/adminService')
const {companyGet}=require('../roleService/companyService')
const {userGet}=require('../roleService/userService')

const {cGetAdmin,cGetCompany,cGetUser}=require('../condition/cGet')
const { decrypt } = require('../../securityMiddleware/crypto')

const vGet= async (req,res)=>{
    try{
        const filter = {}
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key];
        });
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:{
                if(cGetAdmin.includes(adus)){
                    adminGet[adus](req,res,filter)
                    return 
                }else return res.send(errorMessages.accessDenied) 
            }
            case process.env.ONE:{
                if(cGetCompany.includes(adus)){
                    companyGet[adus](req,res,filter)
                    return 
                }else {return res.send(errorMessages.accessDenied) }
            }
            case process.env.TWO:{
                if(cGetUser.includes(adus)){
                    userGet[adus](req,res,filter)
                    return 
                }else return res.send(errorMessages.accessDenied) }
                
            default:
                return res.send(errorMessages.authorizationNotValid)
        }                
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }
}
module.exports={vGet}