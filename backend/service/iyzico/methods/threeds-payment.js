const { iyzipay } = require("../connection/iyzipay");


const initializePayment=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.threedsInitialize.create(data,(err,result)=>{
            if(err){
                reject(err);
            }else{
                resolve(result);
            }
        })
    })
}

const complatePayment=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.threedsPayment.create(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports={
    initializePayment,
    complatePayment
}