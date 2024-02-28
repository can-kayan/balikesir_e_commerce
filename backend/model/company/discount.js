const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate');
mongoose.plugin(autopopulate);
const DiscountSchema=mongoose.Schema({
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
        autopopulate:true
    },
    discount:{
        type:Number,
        required:true
    }
},{ timestamps: true })
exports.Discount=mongoose.model('Discount',DiscountSchema);