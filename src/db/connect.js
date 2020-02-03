const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/chatApp',{useNewUrlParser:true,
useCreateIndex:true
})

const rooms=mongoose.model('rooms',{

    roomname:{
        type: String
    }
})

const room1=new rooms(
    {
    roomname: 'kalyan'
    }
)
room1.save().then(()=>{
console.log('connection is created sucessfully')    
}).catch((error)=>{
console.log(error)
})