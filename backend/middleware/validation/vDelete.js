const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')

const {adminDelete}=require('../roleService/adminService')
const {companyDelete}=require('../roleService/companyService')
const {userDelete}=require('../roleService/userService')

const {cDelAdmin,cDelCompany,cDelUser}=require('../condition/cDelete')
const { decrypt } = require('../../securityMiddleware/crypto')
const vDelete=async (req,res)=>{
    try{
        const filter = {}
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key]
        })
        const adus=req.params.modelName
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cDelAdmin.includes(adus)){
                    adminDelete[adus](req,res,filter)
                    return
                }else return res.send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cDelCompany.includes(adus)){
                    companyDelete[adus](req,res,filter)
                    return
                }else return res.send(errorMessages.accessDenied) 

            case process.env.TWO: 
                if(cDelUser.includes(adus)){
                    userDelete[adus](req,res,filter)
                    return
                }else return res.send(errorMessages.accessDenied) 
                
            default:
                return res.status(401).send(errorMessages.authorizationNotValid)
        }
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }    
}
module.exports={vDelete}