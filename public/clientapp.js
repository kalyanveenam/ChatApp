const joinButton=document.getElementById('join')
const form_username=document.getElementById('username')
const form_passcode=document.getElementById('passcode')
socket=io()
var user,room
joinButton.addEventListener('click',()=>{
    console.log('clicked')
    user=form_username.value;
    room=form_passcode.value;
     console.log('length->'+user)
    socket.emit('msg',{user,room})
});

    // fetch('/saveddata?room='+room+'').then((res)=>{
    //     console.log(res)
    //     res.text().then((data)=>{
    //         console.log(data)

    //     })
    // })
    // console.log(room)