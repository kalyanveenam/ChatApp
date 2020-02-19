const mongoose=require('mongoose')
const connection=mongoose.connect(process.env.DBPATH,{useNewUrlParser:true,
useCreateIndex:true
},()=>{
   console.log('connection is established ') 
})


