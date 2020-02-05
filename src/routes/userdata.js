const http= require('http')
const express=require('express')
const userdata=require('../models/users')
const users=require('../utils/users')


const app= express()
const server=http.createServer(app)
//routes
console.log(global.roomName);
const saveddata = app.get('/saveddata',(req,res)=>{
    console.log('-----------------')
    console.log(req.query)
    const data= userdata.find({'room':req.query.room}).then((data)=>{
        
        
        res.send(data)
        console.log(data)
    })

   })
module.exports=saveddata;