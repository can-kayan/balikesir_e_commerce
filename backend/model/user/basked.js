const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const BaskedSchema=mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        autopopulate:true
    },
    quantity:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:Number,
        required:true
    },
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        autopopulate:true
    }
},{ timestamps: true })
exports.Basked=mongoose.model('Basked',BaskedSchema);

