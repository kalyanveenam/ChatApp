const mongoose=require('mongoose')
const connection=mongoose.connect('mongodb://127.0.0.1:27017/chatApp',{useNewUrlParser:true,
useCreateIndex:true
},()=>{
   console.log('connection is established ') 
})


