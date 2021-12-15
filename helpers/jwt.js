const expressJwt =require("express-jwt")
require("dotenv/config")

const isRevoked=(req,payload,done)=>{
    if(!payload.isAdmin){
        done(null,true)
    }
      done()
}


authJwt=() => {
    const secret=process.env.secret;

    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked:isRevoked
     
    }).unless({
        path:["/api/login","/api/register"]
            

    })


    
}



module.exports = authJwt