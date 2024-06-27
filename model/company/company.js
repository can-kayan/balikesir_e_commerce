const mongoose=require('mongoose');
const autopopulate=require('mongoose-autopopulate');
const nanoid = require('../../securityMiddleware/nanoid');
mongoose.plugin(autopopulate);
const CompanySchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    logo:{
        type:String,
    },
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
        unique:true
    }

},{ timestamps: true })
exports.Company=mongoose.model('Company',CompanySchema);