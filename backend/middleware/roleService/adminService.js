const { decrypt } = require('../../securityMiddleware/crypto')
const {sAddToSet} = require('../../service/sAddToSet')
const {sDelete} = require('../../service/sDelete')
const {sGet} = require('../../service/sGet')
const {sPost, sAdminPost}=require('../../service/sPost')
const {sPull}=require('../../service/sPull')
const {sPut, sAdminPut}=require('../../service/sPut')
const {sSet}=require('../../service/sSet')
const {sAreaSet}=require('../../service/sAreaSet')
const { rPost } = require('../../repository/rPost')
const { rPut } = require('../../repository/rPut')
const { Product, PastProductPrice } = require('../../helper/models')
const adminAddToSet={
    Favori:async(req,res)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    },
    DeletedFromCard:async(req,res)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    },
    Product:async(req,res)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    },
    Message:async(req,res,filter)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    },
    Admin:async(req,res,filter)=>{
        let toList=await sAddToSet(req,res)
        return res.send(toList);
    }
}
const adminPost={
    Admin:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Address:async(req,res)=>{
        let toList=await sAdminPost(req,res)
        return res.send(toList)
    },
    Basked:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Card:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Company:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Favori:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Infolog:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    DeletedFromCard:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Product:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    ProductRating:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    // ReturnReason:async(req,res)=>{
    //     let toList=await sAdminPost(req,res)                    
    //     return res.send(toList)
    // },
    User:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Category:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    SiteThema:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    MainCategory:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    Order:async(req,res)=>{
        orderDetails(req)  
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    },
    // ShipmentCancel:async(req,res)=>{
    //     if(req.body.refund===false)
    //         cancelRefundUpdateOrderDetails.Cancel(req)
    //     else{
    //         cancelRefundUpdateOrderDetails.Refund(req)
    //     }
    //     let toList=await sAdminPost(req,res)                    
    //     return res.send(toList)
    // },
    Message:async(req,res)=>{
        let toList=await sAdminPost(req,res)                    
        return res.send(toList)
    }
}
const adminGet={
    Admin:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                logo:decrypt(toList[i].logo),
                siteName:decrypt(toList[i].siteName),
                description:decrypt(toList[i].description),
                address:decrypt(toList[i].address),
                image:{
                    siteLocation:decrypt(toList[i].siteLocation),
                    path:decrypt(toList[i].path)
                },
                socialNetwork:{
                    name:decrypt(toList[i].nameS),
                    icon:decrypt(toList[i].iconS),
                    link:decrypt(toList[i].linkS)
                },
                referance:{
                    name:decrypt(toList[i].nameR),
                    icon:decrypt(toList[i].iconR),
                    link:decrypt(toList[i].linkR)
                }
            }
        }
        return res.send(toList);
    },
    Basked:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                product:toList[i].product,
                quantity:decrypt(toList[i].quantity),
                totalPrice:decrypt(toList[i].totalPrice),
                infolog:toList[i].infolog
            }
        }
        return res.send(toList);
    },
    ProductViewingHistory:async (req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList)  
    },
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
    Favori:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Carts:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    PaymentFailed:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    PaymentSuccess:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Discount:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    OrderDetails:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                basked:req.body.basked,
                infolog:toList[i].infolog,
                phoneNumber:decrypt(toList[i].phoneNumber),
                address:decrypt(toList[i].address),
                city:decrypt(toList[i].city),
                country:decrypt(toList[i].country),
                zipcode:decrypt(toList[i].zipcode)
            }
        }
        return res.send(toList);
    },
    DeletedFromCart:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Product:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                name:decrypt(toList[i].name),
                description:decrypt(toList[i].description),
                image:decrypt(toList[i].image),
                variantAttributes:{
                    name:decrypt(toList[i].name),
                    value:decrypt(toList[i].value)
                },
                category:decrypt(toList[i].category),
                brand:decrypt(toList[i].brand),
                price:decrypt(toList[i].price),
                currency:decrypt(toList[i].currency),
                itemType:decrypt(toList[i].itemType)
            }
        }
        return res.send(toList);
    },
    ProductRating:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                order:toList[i].order,
                description:decrypt(toList[i].description),
                rating:decrypt(toList[i].rating),
                product:toList[i].product,
                infolog:toList[i].infolog
            }
        }
        return res.send(toList); 
    },
    // ReturnReason:async(req,res,filter)=>{
    //     let toList=await sGet(req,res,filter)
    //     return res.send(toList); 
    // },
    // ShipmentCancel:async(req,res,filter)=>{
    //     let toList=await sGet(req,res,filter)
    //     return res.send(toList);
    // },
    Category:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
       
        return res.send(toList);
    },
    MainCategory:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        return res.send(toList);
    },
    Address:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        for(let i=0;i<toList.length;i++){
            toList[i]={
                address:decrypt(toList[i].address),
                city:decrypt(toList[i].city),
                country:decrypt(toList[i].country),
                zipcode:decrypt(toList[i].zipcode)
            }
        }
        
        return res.send(toList);
    },
    Infolog:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
       for(let i=0;i<toList.length;i++){
            toList[i]={email:decrypt(toList[i].email),
                        role:decrypt(toList[i].role),
                        _id:toList[i]._id}
        }
        
        return res.send(toList);
    },
    Order:async(req,res,filter)=>{
        let toList=await sGet(req,res,filter)
        {for(let i=0;i<toList.length;i++){
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
        }
        return res.send(toList);
    },
    User:async(req,res,filter)=>{
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
    Message:async (req,res,filter)=>{
        filter['infolog']=req.decoded.id
        let toList=await sGet(req,res,filter)
        console.log(toList)
        for(let i=0;i<toList.length;i++){
            for(let n=0;n<toList[i].message.length;n++){
                console.log('i: ',i,'n',n,'messagesss ',toList[i].message[n])
                toList[i].message[n]={
                    infolog:toList[i].message[n].infolog._id,
                    content: decrypt(toList[i].message[n].content)
                }
            }
            
        }
        return res.send(toList);
    }
}
const adminDelete={
    Admin:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    ProductViewingHistory:async (req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)  
    },
    Address:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Basked:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Card:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Company:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Favori:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Infolog:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Order:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    OrderDetails:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    DeletedFromCart:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)  
    },
    Product:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    ProductRating:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    // ReturnReason:async(req,res,filter)=>{
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)
    // },
    // ShipmentCancel:async(req,res,filter)=>{
    //     let toList=await sDelete(req,res,filter)
    //     return res.send(toList)  
    // },
    User:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    Category:async(req,res,filter)=>{
        let toList=await sDelete(req,res,filter)
        return res.send(toList)
    },
    MainCategory:async(req,res,filter)=>{
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
    }
}
const adminPut={
    Admin:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Address:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Basked:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Card:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Company:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Favori:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Infolog:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    DeletedFromCard:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    Product:async(req,res,filter)=>{
        const product=await Product.findOne(filter)
        const PastProductPrice=await PastProductPrice.findOne({product:product._id})
        if(product && product.price > req.body.price){
            if(!PastProductPrice)
                rPost('PastProductPrice',{product:product._id,price:req.body.price})
            else
                rPut('PastProductPrice',PastProductPrice._id,{price:req.body.price})
        }
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    ProductRating:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList);
    },
    User:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList); 
    },
    Category:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList); 
    },
    MainCategory:async(req,res,filter)=>{
        let toList=await sAdminPut(req,res,filter)
        return res.send(toList); 
    },

}
const adminSet={
    Favori:async (req,res)=>{
        let toList=await sSet(req,res)
        return res.send(toList);
    },
    DeletedFromCard:async(req,res)=>{
        let toList=await sSet(req,res)
        return res.send(toList);
    },
    Product:async(req,res)=>{
        let toList=await sSet(req,res)
        return res.send(toList);
    },
    Admin:async(req,res)=>{
        let toList=await sSet(req,res)
        return res.send(toList);
    },
}
const adminPull={
    Company:async (req,res)=>{
       let toList=await sPull(req,res)
       return res.send(toList);
    },
    Favori:async(req,res)=>{
       let toList=await sPull(req,res)
       return res.send(toList);
    },
    DeletedFromCard:async(req,res)=>{
       let toList=await sPull(req,res)
       return res.send(toList); 
    },
    Product:async(req,res)=>{
       let toList=await sPull(req,res)
       return res.send(toList);
    },
    Message:async(req,res)=>{
       let toList=await sPull(req,res)
       return res.send(toList);
    }
}
const adminAreaSet={
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
    Admin:{
        logo:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        siteName:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        address:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Category:{
        mainCategory:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        name:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
    },
    Infolog:{
        role:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        email:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        },
        password:async(req,res)=>{
            let toList=await sAreaSet(req)
            return res.send(toList)
        }
       
    },
    MainCategory:{
        name:async(req,res)=>{
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
        zipCode:async(req,res)=>{
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
    adminAddToSet,
    adminPost,
    adminGet,
    adminDelete,
    adminPut,
    adminSet,
    adminPull,
    adminAreaSet
}