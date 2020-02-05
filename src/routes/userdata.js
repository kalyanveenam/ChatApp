const express=require('express')
const userdata=require('../models/users')

const app= express()
//routes
const saveddata = app.get('/saveddata',(req,res)=>{
    const data= userdata.findById('5e398ee5cf2a137481e89a7a').then((data)=>{res.send(data)})
      // res.send(data)
   })
module.exports=saveddata;