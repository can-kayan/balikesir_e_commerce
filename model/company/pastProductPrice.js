const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate');
mongoose.plugin(autopopulate);
const PastProductPriceSchema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    price:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
        autopopulate:true
    }
},{ timestamps: true })
exports.PastProductPrice=mongoose.model('PastProductPrice',PastProductPriceSchema);