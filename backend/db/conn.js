const mongoose = require("mongoose");


const  DB = "mongodb+srv://titiksha5248:passcrud@crudcluster.rtoobvx.mongodb.net/crudapp"
 
mongoose.connect(DB,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("connection started")).catch((error)=> console.log(error.message));