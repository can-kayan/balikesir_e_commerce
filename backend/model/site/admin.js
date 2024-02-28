const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const AdminSchema=mongoose.Schema({
    logo:{type:String},
    siteName:{type:String},
    description:[{type:String}],
    address:{type:String},
    image:[{siteLocation:{type:String},path:{type:String}}],
    socialNetwork: [{
        name:{type:String},
        icon:{type:String},
        link:{type:String}
    }],
    referance: [{
        name:{type:String},
        icon:{type:String},
        link:{type:String}
    }]
    
},{ timestamps: true })
exports.Admin=mongoose.model('Admin',AdminSchema);

