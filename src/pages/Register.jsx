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
    const [emptyMessage, setEmptyMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const removeAlert = () => {
        setTimeout(() => {
          setMessage("");
          setIsError(false);
        }, 2000);
      }
    
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleRegister = (e) => {
        //check if not empty
        let empty = {};
        if (email.length === 0) {
            empty["email"] = "This field is required";
            setEmptyMessage(empty);
        }
        if (password.length === 0) {
            empty["password"] = "This field is required";
            setEmptyMessage(empty);
        }
        if (confirmPassword.length === 0) {
            empty["confirmPassword"] = "This field is required";
            setEmptyMessage(empty);
        }
        else {
            // validation password match
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                .then( () => {navigate("/")} )
                .catch( (error) => {
                    setIsError(true);
                    if (error.code === 'auth/wrong-password') {
                    setMessage("Password is invalid");
                    }
                    else if (error.code === 'auth/invalid-email'){
                    setMessage("Email is invalid")
                    }
                    else if(error.code === 'auth/weak-password'){
                    setMessage("Password should be at least 6 characters")
                    }
                    else{
                    setMessage(error.message)
                    }
                } )
            }else {
                setIsError(true);
                setMessage("Password doesn't match")
            }   
        }
        setEmptyMessage(empty);

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
                        <div class='m-6 mb-2 w-[90%]'>
                            <Input placeholder="email" type="email" icon="email" action={handleChangeEmail} actionEnter={handleKeyDownRegister} field={email}></Input>
                            <span class='text-red-600 text-sm'>{emptyMessage["email"]}</span>
                            <Input placeholder="password" type="password" icon="password" action={handleChangePassword} actionEnter={handleKeyDownRegister} field={password}/>
                            <span class='text-red-600 text-sm'>{emptyMessage["password"]}</span>
                            <Input placeholder="confirm password" type="password" icon="confirmPassword" action={handleChangeConfirmPassword} actionEnter={handleKeyDownRegister} field={confirmPassword}/>
                            <span class='text-red-600 text-sm'>{emptyMessage["confirmPassword"]}</span>
                        </div>
                        {/* alert error */}
                        {isError ?  
                        <div class='max-w-full h-auto m-6 mt-1 bg-red-600 bg-opacity-30 text-sm italic flex items-center justify-center rounded-lg p-2'>
                        <p class='mx-2 my-0'>{message}</p>
                        {removeAlert()}
                        </div> 
                        : <></>}
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
        
    )
}
