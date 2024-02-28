const { User, Order, Basked, OrderDetails, Infolog } = require('../../helper/models')
const errorHandling = require('../../messageHandling/ErrorHandling')
const successHandling = require('../../messageHandling/SuccessHandling')
const { rAreaSet } = require('../../repository/rAreaSet')
const { rDeleteMany } = require('../../repository/rDeleteMany')
const { rPost } = require('../../repository/rPost')
const { decrypt } = require('../../securityMiddleware/crypto')
const { sAddToSet } = require('../../service/sAddToSet')
const { sAreaSet } = require('../../service/sAreaSet')
const { sDelete } = require('../../service/sDelete')
const { sGet } = require('../../service/sGet')
const {sPost}=require('../../service/sPost')
const {sPull}=require('../../service/sPull')
const {sPut}=require('../../service/sPut')
const {sSet}=require('../../service/sSet')
const { orderDetails } = require('../automaticTransactions/orderDetails')

const userAddToSet={
    Message:async(req,res,filter)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    }
}
const userDelete={
    Address:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Basked:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList
        const searchingBasked=await Basked.findOne(filter)
        if(searchingBasked)
        {
            console.log(req.decoded.id)
            const modelName='DeletedFromCart'
            const domainInfo={
                infolog:req.decoded.id,
                product:await searchingBasked.product
            }
            rPost(modelName,domainInfo)
            toList=await sDelete(req,res,filter)
        }
        return res.send(toList)
    },
    // Card:async(req,res,filter)=>{//private
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // },
    Favori:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Infolog:async (req,res,filter)=>{//private
        let toList=await rAreaSet('Infolog',req.decoded.id,{status:'pasif'})
        return res.send(toList)
    },
    Order:async(req,res,filter)=>{//private 
        filter['infolog']=req.decoded.id
        let toList=[]
        let order=await Order.findOne(filter)
        console.log('Order',order)
        if(order){
            
            let orderDetails=await OrderDetails.findOne({order:order._id})
           
            console.log('orderDetails',orderDetails)
            if(orderDetails){
                rPost('CancelationOrder',{order:Order._id,orderDetails:orderDetails._id,cancelationDetails:req.body.cancelationDetails})
                toList=await rAreaSet('OrderDetails',orderDetails._id,{orderStatus:'cancelled'})
            }
        }
        return res.send(toList)
    },
    ProductRating:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    // ShipmentCancel:async(req,res,filter)=>{//private
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // },
    // User:async(req,res,filter)=>{//private 
    //     filter['infolog']=req.decoded.id
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // },
    // ProductViewingHistory:async (req,res)=>{
    //     filter['infolog']=req.decoded.id
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)  
    // },
    Message:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    // PaymentDetails:async(req,res,filter)=>{
        
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // }
}
const userGet={ 
    Company:async(req,res,filter)=>{
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
    OrderDetails:async(req,res,filter)=>{//private
        let toList=[]
        filter['user']=req.decoded.id
        toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Product:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    ProductRating:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Category:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Message:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        if(toList[0].message)
            for(let i=0;i<toList.length;i++){
                for(let b=0;b<toList[i].message.length;b++){
                    toList[i].message[b]={
                        infolog:await toList[i].message[b].infolog,
                        content: decrypt(await toList[i].message[b].content)
                    }
                }
            }
            
        else return errorHandling.anUnexpectedErrorOccurred
        
        return res.send(toList);
    },
    Address:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                id:toList[i]._id,
                nick:decrypt(toList[i].nick),
                address:decrypt(toList[i].address),
                city:decrypt(toList[i].city),
                country:decrypt(toList[i].country),
                zipcode:decrypt(toList[i].zipcode)
            }
        }
        
        return res.send(toList);
    },
    Basked:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    DeletedFromCart:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Favori:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Order:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
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
                    zipcode:decrypt(toList[i].zipcode)
            }
        }
        
        return res.send(toList);
    },
    User:async(req,res,filter)=>{//private
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                locale:toList[i].locale,
                name:decrypt(toList[i].name),
                surname:decrypt(toList[i].surname),
                phoneNumber:decrypt(toList[i].phoneNumber),
                identityNumber:decrypt(toList[i].identityNumber),
            }
        }
       
        return res.send(toList);
    },
    // ProductViewingHistory:async (req,res,filter)=>{
    //     filter['infolog']=req.decoded.id
    //     let toList=await sGet(req,res,filter)
    //     return res.send(toList)  
    // },
    Infolog:async (req,res,filter)=>{//private
        filter['_id']=req.decoded.id
         // let {email,...other}=await toList[0]
         let toList=await sGet(req,res,filter)
         for(let i=0;i<toList.length;i++){
             toList[i]={
                email:decrypt(toList[i].email),
                status:toList[i].status
            }             
         }
         return res.send(toList);
    },
    MainCategory:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    }
}
const userPost={
    Address:async(req,res)=>{//private
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    Basked:async(req,res)=>{//private
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    // Card:async(req,res)=>{//private
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
    Favori:async(req,res)=>{//private
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    Order:async(req,res)=>{//private 
            
        let toList=await sPost(req,res)
        if(toList){  
            orderDetails(req,toList)    
        }
        return res.send(toList)
    },
    ProductRating:async(req,res)=>{//private
        
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    // ShipmentCancel:async(req,res)=>{//private
    //     if(req.body.refund===false)
    //         cancelRefundUpdateOrderDetails.Cancel(req)
    //     else{
    //         cancelRefundUpdateOrderDetails.Refund(req)
    //     }
    //     let toList=await sPost(req,res)
    //     return res.send(toList)
    // },
    User:async(req,res)=>{//private 
        const user=await User.findOne({infolog:req.decoded.id})
        let toList
        if(!user){toList=await sPost(req,res)}
        else toList=errorHandling.anAccountCanEnterAtMostOneUserInformation
        return res.send(toList)
    },
    Message:async(req,res)=>{
        let toList=await sPost(req,res)
        return res.send(toList)
    },
    deletedFromCart:async (req,res)=>{
        let toList=await sPost(req,res)
        return res.send(toList)  
    },
    // ProductViewingHistory:async (req,res)=>{
    //     let toList=await sPost(req,res)
    //     return res.send(toList)  
    // }
}
const userPull={
    Message:async(req,res)=>{
        let toList=await sPull(req,res)
        return res.send(toList);
    }
}
const userPut={
    Address:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);   
    },
    Basked:async(req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);   
    },
    // Card:async (req,res,filter)=>{
    //     let toList=await sPut(req,res,filter)
    //     return res.send(toList);   
    // },
    Infolog:async (req,res,filter)=>{
        filter['_id']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);   
    },
    ProductRating:async (req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);        
    },
    User:async (req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sPut(req,res,filter)
        return res.send(toList);   
    }
}
const userSet={
    
}
const userAreaSet={
    ProductRating:{
        description:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        rating:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Infolog:{
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
        },
        email:async(req,res)=>{
            // mail bilgisi doğrulanacak ondan sonra işleme dökülecek
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Address:{
        nick:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        address:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        city:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        country:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        zipcode:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
       
    },
    Basked:{
        product:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        quantity:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
        
    },
    User:{
        locale:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        name:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        surname:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        phoneNumber:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        identityNumber:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
        
    },
}
module.exports={
    userAddToSet,
    userDelete,
    userGet,
    userPost,
    userPull,
    userPut,
    userSet,
    userAreaSet
}