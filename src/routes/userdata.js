const http= require('http')
const express=require('express')
const userdata=require('../models/users')
const users=require('../utils/users')


const app= express()
const server=http.createServer(app)
//routes
const saveddata = app.get('/saveddata',(req,res)=>{
    console.log('-----------------')
    console.log(req.query)
    const data2= userdata.find({'room':req.query.room}).then((data)=>{
        console.log(data2)
    })
    res.render('room',{
        user: 'kalyan'
    })  

    
     const data= userdata.find({'room':req.query.room}).then((data)=>{
        
  
    //   //  res.send(data)
    //  
    // })

   })
})
module.exports=saveddata;