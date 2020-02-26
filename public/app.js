const $submitButton=document.getElementById('btn')
const $noteButton=document.querySelector('#notebtn')
const $inputField=document.getElementById('input')
const $savechat=document.getElementById('savechat')
const $locationButton=document.querySelector('#send-location')
const $message=document.querySelector('#msgtxt')
const $slider=document.querySelector('#chat')
const $savebutton=document.querySelector('#save')
const $messageform=document.querySelector('#message-form')
const message_template=document.querySelector('#message-template').innerHTML
const location_template=document.querySelector('#location-template').innerHTML
const sidebar_template=document.querySelector('#sidebar-template').innerHTML
const socket=io()
let count=1;
var text;
const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})
autoScroll=()=>{
   
    $slider.scrollTop=$slider.scrollHeight
}

$savechat.addEventListener('click',()=>{
    window.location.href='/saveddata?room='+room+'';
    // fetch('/saveddata?room='+room+'').then((res)=>{
    //     console.log(res)
    //     res.text().then((data)=>{
    //         console.log(data)

    //     })
    // })
    // console.log(room)
    //i am here
})
socket.on('message',(message)=>{
    const html=Mustache.render(message_template,{
        user: message.user,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm: a')
    })
    
     $message.insertAdjacentHTML('beforeend',html)
       document.getElementById('btn').removeAttribute('disabled')
    autoScroll()

})

    socket.emit('join',{username,room},(error)=>{
    console.log('username->'+username)
      console.log('error',+error)
  
  if(error){
      alert(error)
      location.href='/'
  }
  })
  $submitButton.addEventListener('click',()=>{
    console.log('clicked')
})
  $submitButton.addEventListener('click',()=>{
   
     text = document.getElementById("input");

  console.log(text.value.length)
  if(text.value.length==0){
      alert('please enter a message to send!')
  }
  else{
socket.emit('value',text.value)
$submitButton.setAttribute('disabled','disabled')
$inputField.value='';
$inputField.focus();
socket.on('message',(message)=>{
    const html=Mustache.render(message_template,{
        user: message.user,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm: a')
    })
})
  }

$locationButton.addEventListener('click',()=>{
    $locationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
     const long=position.coords.longitude
     const lat=position.coords.latitude
     const locdata='location:'+lat+','+long
     //console.log(locdata)
        socket.emit('sendlocation',locdata,()=>{
            $locationButton.removeAttribute('disabled')
            console.log('location shared')})
        socket.on('locationDetails',(data)=>{
            const html=Mustache.render(location_template,{
                message:data.url,
                createdAt:moment(data.createdAt).format('h:mm a')
            })
            $message.insertAdjacentHTML('beforeend',html)
            console.log(data)
        })
    })
})


    
  

// socket.on('roomData',(data)=>{
// console.log(data.users) 
// var room=data.room
// var users=data.users
// const html=Mustache.render(sidebar_template,{

//    room,
//    users 
// }) 
// document.querySelector('#sidebar').innerHTML=html;  
// })
//})
  })
