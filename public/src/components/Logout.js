import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"
import {Button} from "../style/logoutStyle"
import {BiPowerOff} from 'react-icons/bi'
function Logout({}){
    const navigate = useNavigate()
    const handleClick = () =>{
        const nav = async () =>{
            localStorage.clear()
            navigate("/login")
        }
        nav()
    }
    return(
            <>
            <Button onClick={handleClick}>
                <BiPowerOff/>
            </Button>
            </>
    )
        
}

export default Logout