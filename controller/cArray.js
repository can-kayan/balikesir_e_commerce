const { encrypt } = require("../securityMiddleware/crypto")

const cArray={
    Product:(req)=>({
        variantAttributes:req.body.variantAttributes,
        image:req.body.image
    }),
    Admin:(req)=>({
        image:{
            siteLocation:req.body.siteLocation,
            path:req.body.path
        },
        socialNetwork: {
            name:req.body.name,
            icon:req.body.icon,
            link:req.body.link
        },
        referance: {
            name:req.body.name,
            icon:req.body.icon,
            link:req.body.link
        }
    }),
    Message:(req)=>({
        message:{infolog:req.decoded.id,content: encrypt(req.body.content)}
    })
}
module.exports={cArray}