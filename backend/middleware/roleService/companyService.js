const { Infolog, Company, Favori, Product, OrderDetails,PastProductPrice } = require('../../helper/models')
const errorHandling = require('../../messageHandling/ErrorHandling')
const { rAddToSet } = require('../../repository/rAddToSet')
const { rAreaSet } = require('../../repository/rAreaSet')
const { rDeleteMany } = require('../../repository/rDeleteMany')
const { rPost } = require('../../repository/rPost')
const { rPut } = require('../../repository/rPut')
const { decrypt } = require('../../securityMiddleware/crypto')
const {sAddToSet} = require('../../service/sAddToSet')
const { sAreaSet } = require('../../service/sAreaSet')
const {sDelete} = require('../../service/sDelete')
const {sGet} = require('../../service/sGet')
const {sPost}=require('../../service/sPost')
const {sPull}=require('../../service/sPull')
const {sPut}=require('../../service/sPut')
const {sSet}=require('../../service/sSet')
const companyPost =  {
    Company:async(req,res)=>{//Private
        const valid=await Company.findOne({infolog:req.decoded.id})
        let toList
        if(!valid){
            toList=await sPost(req,res)}
        else toList=errorHandling.anAccountCanEnterAtMostOneUserInformation
        return res.send(toList)
    },
    Product:async(req,res)=>{//Private
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    // ReturnReason:async(req,res)=>{//Private
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
    // ShipmentCancel:async(req,res)=>{//Private
    //     if(req.body.refund===false)
    //         cancelRefundUpdateOrderDetails.Cancel(req)
    //     else{
    //         cancelRefundUpdateOrderDetails.Refund(req)
    //     }
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
    Message:async(req,res)=>{
        // const modelName='Message'
        // const modelId=await toList._id.toString()
        // const domainInfo={infolog:req.decoded.id}
        // await rAddToSet(modelName,modelId,domainInfo)
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    Discount:async(req,res)=>{
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    // ShiperPrice:async(req,res)=>{
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
    // BuyerInformation:async(req,res)=>{
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
}
const companyGet={
    Company:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                name:decrypt(toList[i].name),
                phone:decrypt(toList[i].phone),
                description:decrypt(toList[i].description),
                logo:decrypt(toList[i].description),
                infolog:toList[i].infolog
            }
        }
        return res.send(toList);
    },
    Discount:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    OrderDetails:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Product:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    ProductRating:async(req,res,filter)=>{//Private
        filter['company']=req.decoded.id
        toList =await sGet(req,res,filter)
        return res.send(toList)
        
    },
    Category:async(req,res,filter)=>{//Private
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Infolog:async(req,res,filter)=>{//Private
        filter['_id']=req.decoded.id
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                email:decrypt(toList[i].email)}
        }
        
        return res.send(toList);
    },
    MainCategory:async(req,res,filter)=>{//Private
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Message:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
            if( toList[0]?.message ){
                for(let i=0;i<toList.length;i++){
                    for(let b=0;b<toList[i]?.message.length;b++){
                        toList[i].message[b]={
                            infolog:await toList[i].message[b].infolog,
                            content: decrypt(await toList[i].message[b].content)
                        }
                    }
                }
                return res.send(toList);
        }
            
        else return res.send(errorHandling.badFileRequest)
        
        
    },
    Favori:async(req,res,filter)=>{
        const search=await Product.find({infolog:req.decoded.id})
        search.map((product)=>filter['product']=product.infolog)
        let toList=await sGet(req,res,filter)
        return res.send(toList)
    },
    DeletedFromCart:async(req,res,filter)=>{
        // const search=await Product.find({infolog:req.decoded.id})
        // for(let i=0;i<await search.length;i++){
        //     filter['product']=search._id
        // }
        const search=await Product.find({infolog:req.decoded.id})
        search.map((product)=>filter['product']=product.infolog)
        let toList=await sGet(req,res,filter)
        return res.send(toList)
    },
    Basked:async(req,res,filter)=>{
        const search=await Product.find({infolog:req.decoded.id})
        search.map((product)=>filter['product']=product.infolog)
        let toList=await sGet(req,res,filter)
        return res.send(toList)
    },
    Order:async(req,res,filter)=>{//Private
        const search=await OrderDetails.find({infolog:req.decoded.id})
        search.map((OrderDetails)=>filter['_id']=OrderDetails.order)
        // for(let i=0;i<await search.length;i++){
        //     filter['_id']=await search.order
        // }
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                _id:toList[i]._id,
                    completed:toList[i].completed,
                    paymentId:toList[i].paymentId,
                    basked:toList[i].basked,
                    buyer:toList[i].buyer,
                    produt:toList[i].product,
                    currency:toList[i].currency,
                    phoneNumber:decrypt(toList[i].phoneNumber),
                    address:decrypt(toList[i].address),
                    city:decrypt(toList[i].city),
                    country:decrypt(toList[i].country),
                    zipCode:decrypt(toList[i].zipCode)
            }
        }
        return res.send(toList);
    }
}
const companyPut={
    Company:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);
    },
    Infolog:async(req,res,filter)=>{//Private
        filter['_id']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);
    },
    Product:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        const product=await Product.findOne(filter)
        const PastProductPrice=await PastProductPrice.findOne({product:product._id})
        if(product && product.price > req.body.price){
            if(!PastProductPrice)
                rPost('PastProductPrice',{product:product._id,price:req.body.price})
            else
                rPut('PastProductPrice',PastProductPrice._id,{price:req.body.price})
        }
       
        let toList=await sPut(req,res,filter)
        return res.send(toList);
    },
    Discount:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);
    }
}
const companyDelete={
    // Company:async(req,res,filter)=>{//Private
    //     filter['infolog']=req.decoded.id
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // },
    Infolog:async(req,res,filter)=>{//Private
        let toList=await rAreaSet('Infolog',req.decoded.id,{status:'pasif'})
        return res.send(toList)
    },
    OrderDetails:async(req,res,filter)=>{//Private
        const orderDetails=await OrderDetails.findOne({
            infolog:req.decoded.id
        });
        if(orderDetails){
            rPost('CancelationOrder',{order:orderDetails.order,orderDetails:orderDetails._id,cancelationDetails:req.body.cancelationDetails})
            toList=await rAreaSet('OrderDetails',orderDetails._id,{orderStatus:'cancelled'})
            return res.send(toList)
        }else return res.send(errorHandling.anUnexpectedErrorOccurred)
        
    },
    Product:async(req,res,filter)=>{//Private
        filter['infolog']=req.decoded.id
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Message:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Discount:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
}
const companyAddToSet={
    Message:async(req,res)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    }
}
const companyPull={
    Message:async(req,res)=>{
        let toList=await sPull(req,res)
        return res.send(toList);
    }
}
const companySet={
    Product:async(req,res)=>{
        let toList=await sSet(req,res)
        return res.send(toList);
    }
}
const companyAreaSet={
    Company:{
        name:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        phone:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        description:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        logo:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
        
    },
    Discount:{
        product:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        discount:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Product:{
        name:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        description:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        image:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        category:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        brand:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        price:async(req,res)=>{
            const product=await Product.findOne({_id:req.params.modelId})
            const PastProductPrice=await PastProductPrice.findOne({product:product._id})
            if(product && product.price > req.body.price){
                if(!PastProductPrice)
                    rPost('PastProductPrice',{product:product._id,price:req.body.price})
                else
                    rPut('PastProductPrice',PastProductPrice._id,{price:req.body.price})
            }
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        stock:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        currnecy:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        itemType:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Infolog:{
        email:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        password:async(req,res)=>{
            const {pastPassword}=req.body
            const validationPassword=await Infolog.findOne({_id:req.decoded.id})
            if(validationPassword){
                const passwordConfirmed=await bcrypt.compare(pastPassword,validationPassword.password);
                if(passwordConfirmed){
                    let toList=await sAreaSet(req)
                    return res.send(toList)
                }
                else return res.send(errorHandling.passwordIncorrect)
            }
            else return res.send(errorHandling.anUnexpectedErrorOccurred)
        }
       
    },
}
module.exports={
    companyAddToSet,
    companyDelete,
    companyGet,
    companyPost,
    companyPull,
    companyPut,
    companySet,
    companyAreaSet
}