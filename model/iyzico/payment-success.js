const mongoose=require('mongoose');
const autopopulate=require('mongoose-autopopulate');
const nanoid = require('../../securityMiddleware/nanoid');
mongoose.plugin(autopopulate);

const ItemtransactionSchema=mongoose.Schema({
    uid:{
        type:String,
        default:nanoid(),
        unique:true,
        required:true
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true
    },
    paymentTransactionId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    paidPrice:{
        type:Number,
        required:true
    }
})

const PaymentsSuccessSchema=mongoose.Schema({
    uid:{
        type:String,
        default:nanoid(),
        unique:true,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["success"]
    },
    cardId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Carts",
        required:true
    },
    conversationId:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true,
        enum:["TRY","USD","EUR"]
    },
    paymentId:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    paidPrice:{
        type:Number,
        required:true
    },
    itemTransactions:{
        type:[ItemtransactionSchema]
    },
    log:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},{
    _id:true,
    collection:"payment-success",
    timestamps:true,
    toJSON:{
        transform:(doc,ret)=>{
            delete ret.__v;
            delete ret.password;
            return{
                ...ret
            }
        }
    }
})
exports.PaymentSuccess=mongoose.model('PaymentSuccess',PaymentsSuccessSchema);