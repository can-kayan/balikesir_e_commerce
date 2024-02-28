const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const ProductRatingchema=mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        autopopulate:true,
        required:true
    },
    description:{
        type:String
    },
    rating:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
        autopopulate:true
    },
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true
    }       
},{ timestamps: true })
exports.ProductRating=mongoose.model('ProductRating',ProductRatingchema);

