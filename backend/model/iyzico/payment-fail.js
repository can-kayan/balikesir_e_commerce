const mongoose=require('mongoose');
const autopopulate=require('mongoose-autopopulate');
const nanoid = require('../../securityMiddleware/nanoid');
mongoose.plugin(autopopulate);

const PaymentFailedSchema=mongoose.Schema({
    uid:{
        type:String,
        default:nanoid(),
        unique:true,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["failure"]
    },
    conversationId:{
        type:String,
        required:true
    },
    errorCode:{
        type:String,
        required:true
    },
    errorMessage:{
        type:String,
        required:true
    },
    log:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
},{
    _id:true,
    collection:"payment-failed",
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
exports.PaymentFailed=mongoose.model('PaymentFailed',PaymentFailedSchema);