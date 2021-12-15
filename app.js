const express=require("express");
const app=express();
const morgan=require("morgan");
const mongoose=require("mongoose");
const cors=require("cors")
const authJwt=require("./helpers/jwt")
require("dotenv/config")
routes=require("./routes/routes")







//database connect 
mongoose.connect(process.env.CONNECTION_STRING,{
    useUnifiedTopology: true,
    dbName:"Authentification",
    useNewUrlParser:true
})
.then(()=>{console.log("Database Connection is ready ...")
}
).catch((err)=>{console.log(err)})

app.use(cors());
app.options('*',cors());

//midlleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());


//Routers
app.use('/api', routes)


//listening
app.listen(4000,()=>{
    console.log("Server is running ")});
