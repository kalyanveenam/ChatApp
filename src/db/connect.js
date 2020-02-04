const mongoose=require('mongoose')
const connection=mongoose.connect('mongodb://127.0.0.1:27017/chatApp',{useNewUrlParser:true,
useCreateIndex:true
},()=>{
   console.log('connection is established ') 
})
// const users=mongoose.model('users',{

//    username:{
//        type: String
//    }
// })



// const user1=new users(
//    {
//    username: 'karthik'
//    }
// )
// user1.save().then(()=>{
// console.log('connection is created sucessfully')    
// }).catch((error)=>{
//    console.log(error)
// })


