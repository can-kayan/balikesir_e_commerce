const mongoose=require('mongoose');
require('dotenv/config')
const nanoid = require('../../securityMiddleware/nanoid');
const InfologSchema=mongoose.Schema({
    role:{
        type:String,
        required:true,
        default:process.env.TWO
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'active',
        enum:['active','pasif']
    }
},{ timestamps: true })
exports.Infolog=mongoose.model('Infolog',InfologSchema);