const mongoose = require('mongoose');
const errorMessages=require('../messageHandling/ErrorHandling')

const sGet = async (req, res,filter) => {
    try{
        const adus=req.params.modelName
        const Modeli = mongoose.model(adus);
        const toList = await Modeli.find(filter);
        return toList;
    }catch{return errorMessages.anUnexpectedErrorOccurred}
    
};
module.exports = { sGet};
