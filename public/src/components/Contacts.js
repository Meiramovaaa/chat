import React, {useEffect, useState} from "react"
import {ContactContainer, Avatar} from "../style/contactsStyle"
import Logo from "../assets/logo.png"
const randomColor = require('randomcolor');
let color = randomColor();
function Contacts({
    contacts,
    changeChat,
    currentUser
}){
    const[currentUserName, setCurrentUserName] = useState(undefined)
    const[currentSelected, setCurrentSelected] = useState(undefined)
    const [currentUserIcon, setCurrentUserIcon] = useState("")

    useEffect(()=>{
        if(currentUser){
            if(currentUser.username.length > 2){
                setCurrentUserIcon(currentUser.username[0])
            }
            else{
                setCurrentUserIcon(currentUser.username)
            }
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) =>{
        setCurrentSelected(index)
        changeChat(contact)
    }
    return(
        <>
        {currentUserIcon && (
            <ContactContainer>
                <div className="brand">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="contacts">
                    {contacts.map((contact, index) => {
                        let color = randomColor();
                         return (
                            <div 
                            className={`contact ${
                                index === currentSelected ? "selected" : ""
                            }`}
                            key={contact._id}
                            onClick={() => changeCurrentChat(index, contact)}
                            >
                                <Avatar color={color} className="avatar"> 
                                    <div className="avatar-logo">{contact.username.length < 3 ? `${contact.username}` : contact.username[0]}</div>
                                </Avatar>
                                <div className="username"> 
                                    <h3> {contact.username}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="current-user">
                    <Avatar color={color} className="avatar"> 
                        <div className="avatar-logo">{currentUserIcon}</div>
                    </Avatar>
                    <div className="username"> 
                        <h1> {currentUser.username}</h1>
                    </div>
                </div>
            </ContactContainer>
        )}
            
        </>
    
    )
}

export default Contacts