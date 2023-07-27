const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

let users = []; 
 
const addUser = (socketId,callerId) => {
	users = users.filter(user => user.callerId !== ' ')
    !users.some(user => user.callerId === callerId) && users.push( {socketId,callerId} );
}  
const removeUser = (socketId,callerId) => { 
   
    users = users.filter(user => user.socketId !== socketId);
   
}
 
const getUser = (userId,callerID) => {  
    return users.find(user => user.callerId === user.callerId); 
} 

const fetchUser = (socketId)=>{
    return users.find(user => user.socketId === socketId); 
}

io.on("connection", (socket) => {
	socket.on("uuid", (data) => {
	
	addUser(socket.id,data.caller)
	})
	
	socket.emit("me", socket.id)
	io.emit("Users", users)

	console.log(users)

	socket.on("disconnect", () => { 
		removeUser(socket.id)
		
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		console.log(data)
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.acknowledge, name: data.name })
	})

	socket.on("answerCall", (data) => {
		console.log('answerCall',data.to)
		io.to(data.to).emit("callAccepted", data.signal)
	})

	socket.on("declineCall", (data) => {
		io.to(data.to).emit("callDeclined",{data})
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))