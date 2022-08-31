import React, {useEffect, useState, useRef} from "react"
import {ChatContainer} from "../style/chatStyle"
import {Link, useNavigate} from "react-router-dom"
import {allUsersRoute, host} from "../utils/APIRoutes"
import Contacts from "../components/Contacts"
import Welcome from "../components/Welcome"
import ChatC from "../components/ChatContainer"
import axios from "axios"
import {io} from "socket.io-client"
function Chat(){
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [currentChat, setCurrentChat] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(()=>{
        let current = localStorage.getItem("chat-app-user")
        if(!current){
            navigate('/login')
        }else{
            setCurrentUser(JSON.parse(current))
            setIsLoaded(true)
        }
    }, [])

    useEffect(()=>{
        if(currentUser){
            socket.current = io(host)
            socket.current.emit("add-user", currentUser._id)
        }
    }, [currentUser])
    useEffect(()=>{
        const curUser = async () =>{
            if(currentUser){
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                setContacts(data.data)
            }
        }
        curUser()
    }, [currentUser])

    const handleChatChange = (chat) =>{
        setCurrentChat(chat)
    }
    return(
    <ChatContainer>
        <div className='container'>
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            {isLoaded  && currentChat === undefined ? <Welcome currentUser={currentUser}/> :
            <ChatC currentChat={currentChat} currentUser={currentUser} socket={socket}/>
            }
            
        </div>
        
    </ChatContainer>
    )
}

export default Chat