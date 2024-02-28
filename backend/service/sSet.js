const errorMessages=require('../messageHandling/ErrorHandling')
const { rSet } = require('../repository/rSet')
const sSet=async (req,res)=>{
    try{       
        const toList= await rSet(req,res) 
        return toList    
    }
    catch(error){
        return errorMessages.anUnexpectedErrorOccurred
    }
}
module.exports={sSet}