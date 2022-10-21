import React from 'react'
import { MdOutlineMail } from 'react-icons/md' 
import { HiOutlineKey } from 'react-icons/hi'
import { BsShieldLock } from 'react-icons/bs'

const Input = (props) => {
    const { icon, action, actionEnter, type, placeholder, field } = props;
  return (
    <div class='m-2 w-full px-3 h-11 flex items-center border-2 border-lightGray-300 rounded-lg focus-within:border-teal-700'>
      {icon === 'email' ? 
      <MdOutlineMail class='text-2xl text-darkGray ml-0 m-2'/> : 
      [icon === 'password' ?
      <HiOutlineKey class='text-2xl text-darkGray ml-0 m-2'/> : 
      [icon === 'confirmPassword' ?
      <BsShieldLock class='text-2xl text-darkGray ml-0 m-2'/> : <></>]  
    ]
      }
      
      <input class='bg-transparent w-full focus:outline-none focus:bg-transparent'
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