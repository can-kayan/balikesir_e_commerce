const {  iyzipay } = require("../connection/iyzipay")


const refundPayments=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.refund.create(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports={
    refundPayments
}