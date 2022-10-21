import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Input from '../components/Input';
import Button from '../components/Button';
import { BsCardChecklist } from 'react-icons/bs';

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [emptyMessage, setEmptyMessage] = useState({})
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    //validation input empty
    const checkEmpty = () => {
        let empty = {};
        if (email.length === 0) {
            empty["email"] = "This field is required"
        }
        if (password.length === 0) {
            empty["password"] = "This field is required"
        }
        if (confirmPassword.length === 0) {
            empty["confirmPassword"] = "This field is required"
        }
        setEmptyMessage(empty);
    }

    const handleRegister = (e) => {
        //check if not empty
        if(!checkEmpty()) {
            // validation password match
            if (password !== confirmPassword) {
                alert("password doesn't match")
            }else {
                createUserWithEmailAndPassword(auth, email, password)
                .then( () => {navigate("/")} )
                .catch( (err) => alert(err.message) )
            }
            
        }
    }

    const handleKeyDownRegister = (e) => {
        if (e.key === "Enter") {
          handleRegister(e);
        }
      }

    return (
        <div class='h-screen w-screen flex items-center justify-center p-20 bg-gradient-to-tr from-primary to-secondary'>
            <div class='w-5/6 h-[90%] flex'>
                {/* container left side or login */}
                <div class='w-1/2 bg-white rounded-bl-xl rounded-tl-xl flex items-center justify-center'>
                    <div class='flex flex-col items-center'>
                        <h1 class='text-2xl font-semibold mb-2'>Create Account</h1>
                        <div class='m-6 w-[90%]'>
                            <Input placeholder="email" type="email" icon="email" action={handleChangeEmail} actionEnter={handleKeyDownRegister} field={email}></Input>
                            <span>{emptyMessage["email"]}</span>
                            <Input placeholder="password" type="password" icon="password" action={handleChangePassword} actionEnter={handleKeyDownRegister} field={password}/>
                            <span>{emptyMessage["password"]}</span>
                            <Input placeholder="confirm password" type="password" icon="confirmPassword" action={handleChangeConfirmPassword} actionEnter={handleKeyDownRegister} field={confirmPassword}/>
                            <span>{emptyMessage["confirmPassword"]}</span>
                        </div>
                        <div class='w-1/2'>
                            <Button children="Create Account" action={handleRegister}></Button>
                        </div>
                        <div class='flex mt-6'>
                            <p class='pr-1'>Already have an account?
                            </p>
                            <a class='text-secondary font-medium hover:text-primary' href="/">Login</a>
                        </div>
                    </div>
                </div>
                {/* container right side */}
                <div class='w-1/2 bg-primary flex items-center justify-center rounded-br-xl rounded-tr-xl'>
                <div class='flex flex-col items-center p-8 gap-4'>
                    <h1 class='text-white text-4xl font-semibold'>Join Us</h1>
                    <BsCardChecklist class='text-white text-7xl'/>
                    <h3 class='text-center text-white text-lg'>Join us to start origanizing your activites </h3>
                </div>
                </div>
                
            </div>
        </div>  
        // <div>
        //     <div>
        //         <input type="email" placeholder='email' onChange={handleChangeEmail} onKeyDown={handleKeyDownLogin}/>
        //         <span>{emptyMessage["email"]}</span>
        //     </div>
        //     <div>
        //         <input type="password" placeholder='password' onChange={handleChangePassword} onKeyDown={handleKeyDownLogin}/>
        //         <span>{emptyMessage["password"]}</span>
        //     </div>
        //     <div>
        //         <input type="password" placeholder='confirm password' onChange={handleChangeConfirmPassword} onKeyDown={handleKeyDownLogin}/>
        //         <span>{emptyMessage["confirmPassword"]}</span>
        //     </div>
        //     <button onClick={handleRegister}>Register</button>
        //     <a href="/">Already have account</a>
        // </div>
        
    )
}
