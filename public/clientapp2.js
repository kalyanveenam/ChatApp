const sendButton=document.getElementById('send')
const form_message=document.getElementById('message')
socket=io()
var user,room
sendButton.addEventListener('click',()=>{
    console.log('clicked')

    user=form_message.value;
     console.log('length->'+user)
    socket.emit('message',{user})
});
