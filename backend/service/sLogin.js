const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const errorMessages=require('../messageHandling/ErrorHandling')
const {Infolog, User}=require('../helper/models')
const { decrypt , encrypt} = require('../securityMiddleware/crypto')
// let returns=false
const calculaterMail=async(mail)=>{
    let returns=false
    let infolog=await Infolog.find()
    
    let calculeter=infolog.map(infolog=>decrypt(infolog.email)===mail?infolog.email.indexOf():undefined)
   
    for(let i=0;i<calculeter.length;i++){
        if(calculeter[i]!=undefined && infolog[i].status=='active'){
            returns= infolog[i]
        }
    }
    return returns
    
    
}
const sLogin= async (req,res)=>{
    const {email,password}=req.body
    // try{
        // if(email==undefined || password==undefined){res.send(errorMessages.missingParameter)}
        // else{
        //     const infolog=await calculaterMail(email)
        //     console.log(infolog)
        //     if(!infolog) return res.send({success:false,message:errorMessages.userOrPasswordIncorrect})
        //     bcrypt.compare(password,infolog.password,function(err,trues){
            
        //         if(trues){
        //         const accessToken=jwt.sign({id:infolog.id,role:infolog.role,email:email},process.env.SECRET_KEY,{expiresIn:"1h"});
        //         let toList={accessToken}
                
        //         return res.send(toList)
        //         }
        //         else
        //             {return res.send({success:false,message:errorMessages.userOrPasswordIncorrect})}
                
        //     })
        // }
        const infolog=await calculaterMail(email)
        console.log(infolog)
        if(!infolog){
            return res.send({success:false,message:errorMessages.userOrPasswordIncorrect})
        }
        const passwordConfirmed=await bcrypt.compare(password,infolog.password);
        if(passwordConfirmed){
            const token=jwt.sign({id:infolog._id,role:infolog.role},process.env.SECRET_KEY)
            res.json({
                token:`Bearer ${token}`

            })
        }else{
            return res.send({success:false,message:errorMessages.userOrPasswordIncorrect})

        }
    // }catch
    // {res.send(errorMessages.anUnexpectedErrorOccurred)}
}
module.exports={sLogin}