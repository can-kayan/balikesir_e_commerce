const mongoose=require('mongoose');
const nanoid = require('../../securityMiddleware/nanoid');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const FavoriSchema=mongoose.Schema({
    infolog:{
        type:String,
        ref:'Infolog'
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
        autopopulate:true
    }
},{ timestamps: true })
exports.Favori=mongoose.model('Favori',FavoriSchema);