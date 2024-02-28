const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const OrderSchema=mongoose.Schema({
    basked:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Basked',
        autopopulate:true,
        required:true
    },
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Product',
        required:true
    },
    currency:{
        type:String,
        required:true,
        default:"TRY",
        enum:["TRY","USD","EUR"]
    },
    completed:{
        type:Boolean,
        default:false,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true,
        default:"Turkey"
    },
    paymentId:{
        type:String
    },
    zipcode:{
        type:String,
        required:true
    }
},{ 
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
exports.Order=mongoose.model('Order',OrderSchema);

