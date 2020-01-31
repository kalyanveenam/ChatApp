users=[];
const addUser=(id,username,room)=>{
console.log('id'+id)
if(!username || !room)
{
    return {'error':'username and room details are required'}
}
const existingUser=users.find((user)=>{
return user.room===room && user.username===username;

})
if(existingUser){
    return {'error':'username or room name already exist'}
}
const user= {id,username,room}
users.push(user)
console.log('-----')
console.log(users)
return {user};


}


const removeUser=(id)=>{

    const index=users.findIndex((user)=>user.id===id)
   // console.log(index)
    if(index!==-1){
       // console.log(users.splice(index,1))
       return users.splice(index,1)
    }
}
const getUser=(id)=>{
    return users.find((user)=>user.id===id)
}
const getUserByRoom=(room)=>{
    return users.filter((user)=>user.room===room)
}
// addUser('23','karthik','hyderabad')
// addUser('25','kalyan','philodophia')
// addUser('23','sandhya','vizag')
// removeUser('23')
// //console.log(getUser('25'))
// console.log(getUserByRoom('vizag'))
//console.log(users)

module.exports={
    addUser,
    removeUser,
    getUser,
    getUserByRoom
}