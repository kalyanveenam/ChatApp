const express=require('express')
const mongoose=require('mongoose')
require('../db/connect')
const users=mongoose.model('users',{

    username:{
        type: String
    }
})



// const user1=new users(
//     {
//     username: 'kalyan'
//     }
// )
// user1.save().then(()=>{
// console.log('connection is created sucessfully')    
// }).catch((error)=>{
//     console.log(error)
// })


module.exports=users