import React, {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import Picker from "emoji-picker-react"
import {IoMdSend} from "react-icons/io"
import {BsEmojiSmileFill} from "react-icons/bs"
import axios from "axios"
import {Container} from "../style/chatInputStyle"
function ChatInput({handleSendMessage}){
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const[msg, setMsg] = useState("")
    const handleEmojiPickerHideShow = () =>{
        setShowEmojiPicker(!showEmojiPicker)
    }

    const handleEmojiClick = (event, emoji) =>{
        let message = msg
        message += emoji.emoji
        setMsg(message)
    }

    const sendChat = (event) =>{
        event.preventDefault()
        if(msg.length > 0){
            handleSendMessage(msg)
            setMsg('')
        }
    }
    return(
        <>
            <Container>
                <div className="button-container">
                    <div className="emoji">
                        <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                        {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick}/>}
                    </div>
                </div>
                <form className="input-container" onSubmit={(e) => sendChat(e)}>
                    <input type="text" placeholder="type your message here" value={msg} onChange={(e) => setMsg(e.target.value)}/>
                    <button className="submit">
                        <IoMdSend/>
                    </button>
                </form>
            </Container>
        </>
    )
        
}

export default ChatInput