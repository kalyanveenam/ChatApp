const $submitButton=document.getElementById('btn')
const $inputField=document.getElementById('input')
const $locationButton=document.querySelector('#send-location')
const $message=document.querySelector('#msgtxt')
const message_template=document.querySelector('#message-template').innerHTML
const location_template=document.querySelector('#location-template').innerHTML
const sidebar_template=document.querySelector('#sidebar-template').innerHTML
const socket=io()
let count=1;
var text;
const{username,room}=Qs.parse(location.search,{ignoreQueryPrefix:true})
autoScroll=()=>{
    $message.scrollTop
}
socket.on('message',(message)=>{
    const html=Mustache.render(message_template,{
        user: message.user,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm: a')
    })
    console.log(message)
     $message.insertAdjacentHTML('beforeend',html)
       document.getElementById('btn').removeAttribute('disabled')
    console.log(message)
    autoScroll()
})

const getvalue = () =>
{
     text = document.getElementById("input");
   // console.log(text.value);
socket.emit('value',text.value)
$submitButton.setAttribute('disabled','disabled')
$inputField.value='';
$inputField.focus();
}
// socket.on('data',(data)=>{
  
//      const html=Mustache.render(message_template,{
//          message:data.text,
//          createdAt:moment(data.createdAt).format('h:mm: a')
//      })
//      $message.insertAdjacentHTML('beforeend',html)
//     console.log(data)
// })
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
    //console.log(navigator.geolocation)
})
socket.emit('join',{username,room},(error)=>{
    
    console.log('error',+error)

if(error){
    alert(error)
    location.href='/'
}
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

//document.getElementById("#input").value;
