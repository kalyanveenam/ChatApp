const sendButton=document.getElementById('send')
const form_message=document.getElementById('message')
socket=io()
var myCats = [
    { name: 'Fiona', age: 4 },
    { name: 'Spot', age: 12 },
    { name: 'Chestnut', age: 4 },
    { name: 'Frisky', age: false },
    { name: 'Biscuit', age: 4 }
  ];
 
  var temp = document.getElementById('cat-list-template').innerHTML;
var renderCats = Handlebars.compile(temp);
document.getElementById('cat').innerHTML = renderCats({
  cats: myCats
});
var user,room
//var template= document.getElementById('test').innerHTML='<h1>{{user}}</h1>';
var template = '<h1>{{user}}</h1>';
//var data = {"title": "Story", "names": [{"name": "Tarzan"}, {"name": "Jane"}]};


//sendButton.addEventListener('')
sendButton.addEventListener('click',()=>{
    console.log('clicked')
 
    user=form_message.value;
     console.log('length->'+user)
    socket.emit('message',{user})
    socket.on('clientdata',(data)=>{
       // console.log(data.data)
        var result = Mustache.render(template, data.data);
        
        console.log(result)
       document.getElementById('test').innerHTML=result;
    })

});


