const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')

const {adminPut}=require('../roleService/adminService')
const {companyPut}=require('../roleService/companyService')
const {userPut}=require('../roleService/userService')
const {cPutAdmin,cPutCompany,cPutUser}=require('../condition/cPut')
const { decrypt } = require('../../securityMiddleware/crypto')

const vPut=async(req,res)=>{
    try{
        const filter = {}
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key]
        })
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cPutAdmin.includes(adus)){
                    adminPut[adus](req,res,filter)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cPutCompany.includes(adus)){
                    companyPut[adus](req,res,filter)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 

            case process.env.TWO: 
                if(cPutUser.includes(adus)){
                    userPut[adus](req,res,filter)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            
            default:
                return res.status(401).send(errorMessages.authorizationNotValid) 
        }    
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }        
}
module.exports={vPut}