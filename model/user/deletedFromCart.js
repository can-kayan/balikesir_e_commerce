const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const DeletedFromCartSchema=mongoose.Schema({
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
        autopopulate:true}   
},{ timestamps: true })
exports.DeletedFromCart=mongoose.model('DeletedFromCart',DeletedFromCartSchema);

