import React, {useEffect, useState} from "react"
import {FormContainer} from "../style/registerStyle"
import {Link, useNavigate} from "react-router-dom"
import Logo from "../assets/logo.png"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import {registerRoute} from "../utils/APIRoutes"
function Register(){
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username:'',
        email:"",
        password:"",
        confirmPassword:''
    })
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(handleValidation()){
            const {password, username, email} = values
            const {data} = await axios.post(registerRoute, {
                username,
                email,
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
        const {password, confirmPassword, username, email} = values
        if(password !== confirmPassword){
            toast.error(
                "password and confirm password should be same.",
                toastOptions
            )
            return false
        }else if(username.length < 3){
            toast.error(
                "Username should be longer.",
                toastOptions
            )
            return false
        }else if(email===""){
            toast.error(
                "Email is required.",
                toastOptions
            )
            return false
        }else if(password.length < 8){
            toast.error(
                "Password should be greater than 8 characters.",
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
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="email" 
                    placeholder="Email" 
                    name="email" 
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    onChange={(e) => handleChange(e)}
                    />
                    <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    onChange={(e) => handleChange(e)}
                    />

                    <button type="submit">
                        Create User
                    </button>
                    <span>Already has an account? <Link to="/login">Login</Link></span>
                </form>
            </FormContainer>
            <ToastContainer/>
        </>
        
    ) 
}

export default Register