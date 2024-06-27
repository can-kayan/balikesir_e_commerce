const { iyzipay } = require("../connection/iyzipay")



const initializeCheckout=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.checkoutFormInitialize.create(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const getFormPayment=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.checkoutForm.retrieve(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports={
    initializeCheckout,
    getFormPayment
}