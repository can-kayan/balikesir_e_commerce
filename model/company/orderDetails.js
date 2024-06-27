const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate');
mongoose.plugin(autopopulate);
const OrderDetailsSchema=mongoose.Schema({
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true,
        autopopulate:true
    },
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
        autopopulate:true
    },
    orderStatus:{
        type:String,default:'order taken',
        enum:['order taken','cancelled','order being prepared','in cargo','was delivered']
    },
    paymentTransactionId:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
        autopopulate:true
    }
},{ timestamps: true })
exports.OrderDetails=mongoose.model('OrderDetails',OrderDetailsSchema);