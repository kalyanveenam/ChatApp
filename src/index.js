const http= require('http')
const path=require('path')
const express=require('express')

const userdata=require('./models/users')

//const{generateMessage}=require('./utils/date')
const {addUser,removeUser,getUser,getUserByRoom}=require('./utils/users')
const port=process.env.PORT||3000
const app= express()
app.set('view engine','hbs')
const server=http.createServer(app)
const io= require('socket.io')(server)
const routes=require('./routes/userdata')

const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))
app.use(routes);
io.on('connection',(socket)=>{
    console.log('connection is created sucessfully')
    // socket.emit('message',{
    //     text:'welcome',
    //     createdAt: new Date().getTime()
    // })
    socket.on('join',({username,room},callback)=>{
        console.log('username from join'+username)
       room=room.trim().toLowerCase();
         const {user,error}=addUser(socket.id,username,room)
       console.log('this is error')
         console.log(error)
         if(error){
            return callback(error)
        }
       
         console.log(user.username)
       
        //console.log(username)
        socket.join(room)
        socket.emit('message',{
            user: 'hey!',
            text:'Thanks for being here, will notify when others join!',
            createdAt: new Date().getTime()
           
        })
    
        console.log('before emit')
        socket.emit('roomData',{
            users: getUserByRoom(user.room)
        })
        socket.to(room).emit('message',{ 
        user:'',
        text: user.username+' has joined',
        createdAt: new Date().getTime()})
     callback()   
    })
    //console.log(generateMe
    
    socket.on('value',(text)=>{
  const user=getUser(socket.id)
  console.log('message from user:')
  //console.log(user.room)
        console.log("text:"+text)
        const user1=new userdata(
            {    
                username:user.username,
                message:text,
                room:user.room
            }
        )
        user1.save().then(()=>{
            console.log('user name is added to db')
        }).catch('issue in adding user to db')
        io.to(user.room).emit('message',{  
            user:user.username,
            text:text,
            createdAt:new Date().getTime()
        })
   //save
//    const saveddata = app.get('/saveddata',(req,res)=>{
//     const data= userdata.find({'room':user.room}).then((data)=>{res.send(data)})
//        res.send(data)
//    })
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
        console.log(user)
        if(user){
        io.emit('message', {
            user:'Alert',
            text:user[0].username+' has left the room ',
            createdAt:new Date().getTime()
        })
        }
    })
})

server.listen(port,()=>{console.log('listening on port '+port)})
