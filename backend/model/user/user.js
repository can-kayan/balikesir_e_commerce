const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const UserSchema=mongoose.Schema({
    infolog:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Infolog',
      unique:true,
      required:true
    },
    locale:{
        type:String,
        default:"tr",
        enum:["tr","en"]
    },
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    identityNumber:{
        type:String,
        default:"00000000000"
    },
    ip:{
        type:String,
        required:true,
        default:"85.34.78.112"
    },
    cardUserKey:{
        type:String,
        required:false,
        unique:true
    }

},{ timestamps: true })
exports.User=mongoose.model('User',UserSchema);