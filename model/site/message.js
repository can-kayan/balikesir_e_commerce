const mongoose = require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const MessageSchemas=mongoose.Schema({
    infolog:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true,
        autopopulate:true
    }],
    message:[{
        infolog:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Infolog',
            autopopulate:true
        },
        content:{
            type:String
        }
    },{timestamps:true}]
},{ timestamps: true })
exports.Message=mongoose.model('Message',MessageSchemas);

