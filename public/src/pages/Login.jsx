import React, {useEffect, useState} from "react"
import {FormContainer} from "../style/registerStyle"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {loginRoute} from "../utils/APIRoutes"
function Login(){
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username:'',
        password:""
    })
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(handleValidation()){
            const {password, username} = values
            const {data} = await axios.post(loginRoute, {
                username,
                password
            })
            if(data.status===false){
                toast.error(data.msg,toastOptions)
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                navigate("/")
            }

        }
    }

    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"light"
    }

    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/")
        }
    },[])

    const handleValidation = () =>{
        const {password, username} = values
        if(username.length ===""){
            toast.error(
                "Username and password is required.",
                toastOptions
            )
            return false
        }else if(password.length === ""){
            toast.error(
                "Username and password is required.",
                toastOptions
            )
            return false
        }
        return true

    }

    const handleChange = e =>{
        setValues({...values, [e.target.name]:e.target.value})
    }
    return(
        <>
            <FormContainer>
                <form onSubmit={(event) => handleSubmit(event) }>
                    <div className="brand">
                        <img src={Logo} alt=""/>
                    </div>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    name="username" 
                    min="3"
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)}
                    />

                    <button type="submit">
                        Login User
                    </button>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
        
    ) 
}

export default Login