import React from 'react'

interface CustomButtonProps {
    className: string
    onClick: () => void
    text: string
    helperText: string
}

const CustomButton:React.FC<CustomButtonProps> = ({
    className,
    onClick,
    text,
    helperText
}) => {
  return (
    <div className='flex flex-col justify-center gap-1 items-center relative pb-1'>
        <button className={className} onClick={onClick}>
            {text}
        </button>
        <p className='text-xs absolute top-full'>{helperText}</p>
    </div>
  )
}

export default CustomButton