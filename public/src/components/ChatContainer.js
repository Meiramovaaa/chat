import React, {useEffect, useState, useRef} from "react"
import {Container} from "../style/chatContainerStyle"
import {Avatar} from "../style/contactsStyle"
import Logout from "../components/Logout"
import ChatInput from "./ChatInput"
import axios from "axios"
import {sendMessageRoute, getAllMessagesRoute} from "../utils/APIRoutes"
import { v4 as uuidv4 } from "uuid";
const randomColor = require('randomcolor');
let color = randomColor();
function ChatC({currentChat, currentUser, socket}){
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    useEffect(()=>{
        const mesg = async() =>{
            if(currentChat){
                const response = await axios.post(getAllMessagesRoute, {
                    from:currentUser._id,
                    to:currentChat._id
                })
                setMessages(response.data)
            }
        }
        mesg()
    }, [currentChat])
   const handleSendMessage = async (msg) =>{
        await axios.post(sendMessageRoute, {
            from:currentUser._id,
            to:currentChat._id,
            message:msg
        })
        socket.current.emit("send-msg", {
            to:currentChat._id,
            from:currentUser._id,
            message:msg
        })

        const msgs = [...messages]
        msgs.push({fromSelf:true, message:msg})
        setMessages(msgs)
   }  
   
   useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-recieve", (msg)=>{
            setArrivalMessage({fromSelf:false, message:msg})
        })
    }
   }, [])

   useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev, arrivalMessage])
   }, [arrivalMessage])


   useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
    return(
        <>
        {
            currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <Avatar color={color} className="avatar">
                                <div className="avatar-logo">
                                    {currentChat.username.length < 3 ? `${currentChat.username}` : currentChat.username[0]}
                                </div>
                            </Avatar>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout/>
                    </div>
                    <div className="chat-messages">
                        {messages.map((message) => {
                        return (
                            <div ref={scrollRef} key={uuidv4()}>
                            <div
                                className={`message ${
                                message.fromSelf ? "sended" : "recieved"
                                }`}
                            >
                                <div className="content ">
                                <p>{message.message}</p>
                                </div>
                            </div>
                            </div>
                        );
                        })}
                    </div>
                    <ChatInput handleSendMessage={handleSendMessage}/>
                </Container>
            )
        }
            
        </>
    
    )
}

export default ChatC