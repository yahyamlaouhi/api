const express=require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
require("dotenv/config")

router.post('/register', (req, res) => {

    console.log(req.body)
    const user = new User({

        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),

    })
    try{

    user.save().then((createdUser)=>{res.status(200).json(createdUser)}).catch((err)=>{
        res.status(500).json({
            error:err,
            success:false

        } )})

    }catch(e){
        console.log(e)
    }
        // res.send(user)

}
)




router.post('/login', async (req,res) => {
    const secret=process.env.secret

    const user = await User.findOne({email: req.body.email})
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password,user.password)){
        const token=jwt.sign({
            userId:user.id,            
        },
        secret
        ,{expiresIn:"1d"}
        )
        res.status(200).send({user:user.email,token:token})

    }else{
          res.status(300).send({error:"password or email invalid"})
    }
})


module.exports =router;