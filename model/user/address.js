const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const AddressSchema=mongoose.Schema({
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true
    },
    nick:{
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
        default:"Turkey"
    },
    zipcode:{
        type:String,
        required:true
    }
},{ timestamps: true })
exports.Address=mongoose.model('Address',AddressSchema);