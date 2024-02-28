const mongoose=require('mongoose');
const autopopulate=require('mongoose-autopopulate')
mongoose.plugin(autopopulate);
const productViewingHistorySchema=mongoose.Schema({
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
exports.ProductViewingHistory=mongoose.model('ProductViewingHistory',productViewingHistorySchema);