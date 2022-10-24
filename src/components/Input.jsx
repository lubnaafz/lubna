import React from 'react'
import { MdOutlineMail } from 'react-icons/md' 
import { HiOutlineKey } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'

const Input = (props) => {
    const { icon, action, actionEnter, type, placeholder, field } = props;
  return (
    <div class='m-2 ml-0 w-full px-3 h-11 bg-white flex items-center border-2 border-lightGray-300 rounded-lg focus-within:border-teal-700 focus:bg-whiteBone'>
      {icon === 'email' ? 
      <MdOutlineMail class='text-2xl text-darkGray ml-0 m-2'/> : 
      [icon === 'password' ?
      <HiOutlineKey class='text-2xl text-darkGray ml-0 m-2'/> : 
      [icon === 'confirmPassword' ?
      <BsShieldLock class='text-2xl text-darkGray ml-0 m-2'/> : <></>]  
    ]
      }
      
      <input class='bg-transparent w-full border-none focus:ring-0 focus:bg-transparent'
        type={type}
        placeholder={placeholder}
        onChange={action}
        onKeyDown={actionEnter}
        value={field}
    />
    </div>
  )
}

export default Input