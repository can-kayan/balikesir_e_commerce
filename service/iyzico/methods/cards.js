const { Session } = require("../../../securityMiddleware/Session");
const iyzipay = require("../connection/iyzipay");
const axios =require('axios')

const createUserCard= (req,data)=>{
    return new Promise((resolve,reject)=>{
        //  axios.post('https://api.iyzipay.com/cardstorage/card',Session, { data },
        // (err, result ) => {if(err){
        //             reject(err);
        //         }else{
        //             resolve(result);
        //         }});
        // console.log('authorization',req.headers.authorization)
      
        const options = {
            header: {
              'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGM0Y2Q4NzM0NmI1ODkxYTJjZWE5MiIsInJvbGUiOiJmNGQxYjNmOTk1YmMyZmVhNDAwMGIwZDdlMWUyYmZhNyIsImlhdCI6MTcwMzc5ODY5MX0.9QX6_6j0_-sUP9kVNvm1l8ykgP0aqvZ6KXOfs57nmxE'
              // veya 'Authorization': 'API_ANAHTARI_BURAYA_GELIR'
            },
            parameters:data
          };
          console.log('session',Session.Authorization)
                axios.post('https://api.iyzipay.com/cardstorage/card', data,{
                    headers: {
                        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGM0Y2Q4NzM0NmI1ODkxYTJjZWE5MiIsInJvbGUiOiJmNGQxYjNmOTk1YmMyZmVhNDAwMGIwZDdlMWUyYmZhNyIsImlhdCI6MTcwMzc5ODY5MX0.9QX6_6j0_-sUP9kVNvm1l8ykgP0aqvZ6KXOfs57nmxE',
                        "apiKey":"sandbox-0NhfijcZgKk6V9jxAeumEXQ3VwJucj2H",
                        "secretKey":"ppmmmHeQwdTF55x4U8Qub8A6Llzkwv6F",
                        "uri":"https://sandbox-api.iyzipay.com"
                    }}
                    ).then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err);
                    });
        // iyzipay.card.create(data,(err,result)=>{
        //     if(err){
        //         reject(err);
        //     }else{
        //         resolve(result);
        //     }
        // })
    })
}

const getUserCards = (data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.cardList.retrieve(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const deleteUserCard=(data)=>{
    return new Promise((resolve,reject)=>{
        iyzipay.card.delete(data,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports={
    createUserCard,
    getUserCards,
    deleteUserCard
}