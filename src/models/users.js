const express=require('express')
const mongoose=require('mongoose')
require('../db/connect')
const users=mongoose.model('users',{

    username:{
        type: String
    },
    message:{
        type: String
    },
    room:{
        type:String  
      }
   
})



module.exports=users