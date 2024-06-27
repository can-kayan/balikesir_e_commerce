const bcrypt =require('bcrypt')
const {encrypt}=require('../securityMiddleware/crypto')
const {totalPrice}=require('../middleware/automaticTransactions/baskedModels')
const { productRatingInCompanyId, productId } = require('../middleware/automaticTransactions/productRatingModels')
const { mainCategory } = require('../middleware/automaticTransactions/productModels')
const { buyer, product } = require('../middleware/automaticTransactions/orderModels')

const cModels={
    //Company
    Company:(req)=>({
     name:encrypt(req.body.name),
     phone:encrypt(req.body.phone),
     description:encrypt(req.body.description),
     logo:encrypt(req.body.logo),
     infolog:req.decoded.id   
    }),
    Discount:(req)=>({
        infolog:req.decoded.id,
        product:req.body.product,
        discount:req.body.discount
    }),
    OrderDetails:(req)=>({
        order:req.body.order,
        infolog:req.body.infolog,
        orderStatus:req.body?.orderStatus
    }),
    Product:async(req)=>({
        name:req.body.name,
        description:req.body.description,
        image:req.body.image,
        variantAttributes:req.body.variantAttributes,
        category:req.body.category,
        mainCategory:await mainCategory(req),
        brand:req.body.brand,
        price:req.body.price,
        stock:req.body.stock,
        currency:req.body.currency,
        itemType:req.body.itemType,
        infolog:req.decoded.id
    }),
    ProductRating:async(req)=>({
        order:req.body.order,
        description:req.body.description,
        rating:req.body.rating,
        product:await productId(req),
        infolog:req.decoded.id,
        company:await productRatingInCompanyId(req)
    }),


    //iyzico
    //...


    //Site
    Admin:(req)=>({
        logo:encrypt(req.body?.logo),
        siteName:encrypt(req.body?.siteName),
        description:req.body?.description,
        address:encrypt(req.body?.address),
        image:req.body.image
        ,
        socialNetwork:req.body.socialNetwork
        ,
        referance:req.body.referance
        
    }),
    Category:(req)=>({
        mainCategory:req.body.mainCategory,
        name:req.body.name
    }),
    Infolog:async(req)=>({
        role:encrypt(req.body.role),
        email:encrypt(req.body.email),// şifrelenecek
        password:await bcrypt.hash(req.body.password,10)// şifrelenecek
    }),
    MainCategory:(req)=>({
        name:req.body.name
    }),
    Message:(req)=>({
        infolog:[req.body.id,req.decoded.id]
    }),
    

    //User
    Address:(req)=>({
        infolog:req.decoded.id,
        nick:encrypt(req.body.nick),
        address:encrypt(req.body.address),
        city:encrypt(req.body.city),
        country:encrypt(req.body.country),
        zipcode:encrypt(req.body.zipcode)
    }),
    Basked:async(req)=>({
        product:req.body.product,
        quantity:req.body.quantity,
        totalPrice:await totalPrice(req),
        infolog:req.decoded.id
    }),
    DeletedFromCard:(req)=>({
        infolog:req.decoded.id,
        product:req.body.product
    }),
    Favori:(req)=>({
        infolog:req.decoded.id,
        product:req.body.product
    }),
    Order:async(req)=>({
        basked:req.body.basked,
        infolog:req.decoded.id,
        buyer:await buyer(req),
        product:await product(req),
        phoneNumber:encrypt(req.body.phoneNumber),
        address:encrypt(req.body.address),
        city:encrypt(req.body.city),
        country:encrypt(req.body.country),
        zipcode:encrypt(req.body.zipcode)
    }),
    ProductViewingHistory:(req)=>({
        infolog:req.decoded.id,
        product:req.body.product
    }),
    User:(req)=>({
        infolog:req.decoded.id,
        locale:req.body.locale,
        name:encrypt(req.body.name),
        surname:encrypt(req.body.surname),
        phoneNumber:encrypt(req.body.phoneNumber),
        identityNumber:encrypt(req.body.identityNumber),
        ip:encrypt(req.ip)
    })
}
module.exports={cModels}