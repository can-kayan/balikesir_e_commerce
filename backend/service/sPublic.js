const mongoose = require('mongoose');
const errorMessages=require('../messageHandling/ErrorHandling')
const sPublic= async (req, res) => {
    try{
        const filter = {};
        Object.keys(req.query).forEach(key => {
            filter[key] = req.query[key];
        });
        const adus=req.params.modelName
        const Modeli = mongoose.model(adus);
        const toList = await Modeli.find(filter);
        return res.send(toList);
    }catch{
        return res.send(errorMessages.anUnexpectedErrorOccurred)
    }
};
module.exports = { sPublic};
