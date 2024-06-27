const passport=require('passport')

const Session=passport.authenticate("jwt",{session:false})
module.exports={Session}