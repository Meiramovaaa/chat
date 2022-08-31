import styled from "styled-components";
export const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131324;
    .brand{
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width:300px;
        }
        h1{
            color: #fff;
            text-transform: uppercase;
        }
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: black ;
        border-radius: 2rem;
        padding: 3rem 5rem;
        input{
            background-color: transparent;
            padding: 1rem;
            border: 2px solid #4e0eff;
            border-radius: 0.4rem;
            color: #fff;
            width: 100%;
            font-size: 1rem;
            &:focus{
                border: 1px solid #997af0;
                outline: none;
            }
        }
        button{
            background-color: #997af0;
            color: #fff;
            border: none;
            padding: 1rem 2rem;
            font-weight:bold;
            cursor: pointer;
            border-radius: 0.5rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: .4s;
            &:hover{
                background-color: #4e0fff;
            }
        }
        span{
            color: #fff;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }


`