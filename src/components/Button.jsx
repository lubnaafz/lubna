import React from 'react'

const Button = (props) => {
    const { action, children } = props;
  return (
    <div class='w-full flex items-center '>
      <button class='w-full justify-center h-11 flex items-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white text-base hover:from-secondary hover:to-semiGray'
      onClick={action} 
      >{children}</button>
    </div>
    
  )
}

export default Button