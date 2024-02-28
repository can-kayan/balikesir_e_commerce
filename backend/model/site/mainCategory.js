const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const MainCategorySchema=mongoose.Schema({
    name:{
        type:String
    }
},{ timestamps: true })
exports.MainCategory=mongoose.model('MainCategory',MainCategorySchema);