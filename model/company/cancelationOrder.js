const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate');
mongoose.plugin(autopopulate);
const CancelationOrderSchema=mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        autopopulate:true
    },
    orderDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderDetails',
        autopopulate:true
    },
    cancelationDetails:{
        type:String,
        required:true
    }
},{ timestamps: true })
exports.CancelationOrder=mongoose.model('CancelationOrder',CancelationOrderSchema);