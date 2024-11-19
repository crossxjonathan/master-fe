/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const Button = ({children, className, onClick }) => {
  return (
    <div className={`bg-red-maroon w-28 h-10 py-1 text-lg text-wrap text-center font-semibold border rounded-full cursor-pointer ${className}`} onClick={onClick}>
        {children}
    </div>
  )
}

export default Button