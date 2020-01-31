const http= require('http')
const path=require('path')
const express=require('express')
//const{generateMessage}=require('./utils/date')
const {addUser,removeUser,getUser,getUserByRoom}=require('./utils/users')

const port=process.env.PORT||3002
const app= express()
const server=http.createServer(app)
const io= require('socket.io')(server)

const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))
//onst message='welcome to chatapp';
io.on('connection',(socket)=>{
    console.log('connection is created sucessfully')
    // socket.emit('message',{
    //     text:'welcome',
    //     createdAt: new Date().getTime()
    // })
    socket.on('join',({username,room},callback)=>{
         const {user,error}=addUser(socket.id,username,room)
       console.log('--')
         console.log(user.username)
         if(error){
            return callback(error)
        }
        //console.log(username)
        socket.join(room)
        socket.emit('message',{
            user: 'Admin',
            text:'Welcome',
            createdAt: new Date().getTime()
           
        })
        console.log('before emit')
        socket.emit('roomData',{
            users: getUserByRoom(user.room)
        })
        socket.broadcast.to(room).emit('message',{ text: user.username+' has joined',
        createdAt: new Date().getTime()})
     callback()   
    })
    //console.log(generateMe
    
    socket.on('value',(text)=>{
  const user=getUser(socket.id)
  console.log('message from user:')
  console.log(user.room)
        console.log("text:"+text)
        io.to(user.room).emit('message',{  
            user:user.username,
            text:text,
            createdAt:new Date().getTime()
        })
    })
    socket.on('sendlocation',(data,callback)=>{
        console.log('location:'+data) 
        
        io.emit('locationDetails',{
            url: 'https://google.com/maps?q='+data+'',
            createdAt: new Date().getTime()
        })
        callback()
    })
    
    socket.on('disconnect',()=>{
        console.log('before remove user')
        const user=removeUser(socket.id)
        console.log('tantanakaakaak')
        if(user){
        io.emit('message', ''+user.username+' has left')
        }
    })
})

server.listen(port,()=>{console.log('listening on port '+port)})
