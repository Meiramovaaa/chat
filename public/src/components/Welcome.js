import React, {useEffect, useState} from "react"
import {WelcomeContainer} from "../style/welcomeStyle"
import Robot from "../assets/robot.gif"

function Welcome({
    currentUser
}){
   
    return(
        <>
            <WelcomeContainer>
                <img src={Robot} alt="robot"/>
                <h1>Welcome, <span>{currentUser.username}</span></h1>
                <h3>Please, select a chat for messaging</h3>
            </WelcomeContainer>
        </>
    
    )
}

export default Welcome