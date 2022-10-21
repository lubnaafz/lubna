import React from 'react'

const Button = (props) => {
    const { action, children } = props;
  return (
    <button class='w-full justify-center h-11 flex items-center rounded-lg bg-gradient-to-tr from-primary to-secondary text-white text-base hover:from-secondary hover:to-semiGray'
      onClick={action} 
      >{children}</button>
  )
}

export default Button