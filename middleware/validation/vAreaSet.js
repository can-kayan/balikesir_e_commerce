const errorMessages=require('../../messageHandling/ErrorHandling')
require('dotenv/config')

const {adminAreaSet}=require('../roleService/adminService')
const {companyAreaSet}=require('../roleService/companyService')
const {userAreaSet}=require('../roleService/userService')
const {cAreaSetAdminModel,cAreaSetCompanyModel,cAreaSetUserModel,cAreaSetAdminArea,cAreaSetCompanyArea,cAreaSetUserArea}=require('../condition/cAreaSet')
const { decrypt } = require('../../securityMiddleware/crypto')

const vAreaSet=async(req,res)=>{
    try{
        const filter = {}
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key]
        })
        const {modelName,modelid,areaName}=req.params
        switch(decrypt(req.decoded.role)){
            case process.env.ZERO:
                if(cAreaSetAdminModel.includes(modelName) && cAreaSetAdminArea.includes(modelName)){
                    adminAreaSet[modelName][areaName](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            case process.env.ONE:
                if(cAreaSetCompanyModel.includes(modelName) && cAreaSetCompanyArea.includes(modelName) ){
                    companyAreaSet[modelName][areaName](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 

            case process.env.TWO: 
                if(cAreaSetUserModel.includes(modelName) && cAreaSetUserArea.includes(modelName)){
                    userAreaSet[modelName][areaName](req,res)
                    return
                }else return res.status(401).send(errorMessages.accessDenied) 
            
            default:
                return res.status(401).send(errorMessages.authorizationNotValid) 
        }    
    }catch{
        return res.json({message:errorMessages.anUnexpectedErrorOccurred,status:false})
    }        
}
module.exports={vAreaSet}