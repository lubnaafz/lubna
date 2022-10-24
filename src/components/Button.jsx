import React from 'react'

const Button = (props) => {
    const { action, children } = props;
  return (
    <div class='w-full flex items-center'>
      <button class='w-full justify-center flex items-center rounded-lg bg-gradient-to-tr from-primary to-secondary 
      text-white text-base hover:from-secondary hover:to-semiGray sm:text-base text-xs lg:h-11 h-9'
      onClick={action} 
      >{children}</button>
    </div>
    
  )
}

export default Button