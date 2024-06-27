const { iyzipay } = require("../connection/iyzipay")


const checkInstallment=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.installmentInfo.retrieve(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports={
    checkInstallment
}