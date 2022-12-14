const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoute")
const messageRoutes = require("./routes/messagesRoutes")
const app = express()
const socket = require("socket.io")

require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/messages",messageRoutes)


mongoose.connect("mongodb://localhost:27017/chat", {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("MongoDB connetion is successfull");
}).catch((e)=>{
    console.log(e.message);
})

const server = app.listen(process.env.PORT, ()=>{
    console.log(`SERVER started on PORT ${process.env.PORT}`);
})

const io = socket(server, {
    cors:{
        origin:"http://chat.ziyameiramova.site",
        credentials:true
    }
})
// http://chat.ziyameiramova.site
// origin:"http://localhost:3000",

global.onlineUsers = new Map()

io.on("connection", (socket)=>{
    global.chatSocket = socket
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on("send-msg", (data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.message);
          }
    })
})