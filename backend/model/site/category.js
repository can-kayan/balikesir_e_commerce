const mongoose=require('mongoose');
const nanoids = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const CategorySchema=mongoose.Schema({
    mainCategory:{
        type:String,
        required:true,
        autopopulate:true
    },
    name:{
        type:String
    }
},{ timestamps: true })
exports.Category=mongoose.model('Category',CategorySchema);