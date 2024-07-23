import React, { useEffect, useState } from 'react'
import Sidebar from './Sidenav/Sidebar'

interface GoalNavProps {
    isOpen: boolean,
    startWord: string,
    goalWord: string,
    goalWordInfo : any,
}

const GoalNav:React.FC<GoalNavProps> = ({
    isOpen,
    startWord,
    goalWord,
    goalWordInfo,
}) => {
    const [disabled, setDisabled] = useState(!isOpen);

    useEffect(() => {
        if(!isOpen){
            setTimeout(() => {
                setDisabled(value => !value)
            }, 200)
        }
        else {
            setDisabled(value => !value)
        }
    }, [isOpen])

    return (
        <div className={`fixed w-screen h-screen bg-neutral-500/60 top-0 ${isOpen ? 'opacity-100' : 'opacity-0'} transition duration-200 ${disabled ? 'z-10' : '-z-20'} `}>
            <div className={`h-full w-1/5 bg-white fixed right-0 flex flex-col p-5 py-16 justify-center items-center gap-32
                transition duration-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className='flex-shrink'>
                    <h1 className='text-2xl'>{startWord} ---------{`>`} {goalWord}</h1>
                </div>
                <div className='flex-shrink flex flex-col justify-normal items-center'>
                    <h1 className='text-5xl font-normal -mb-24'>{goalWord}</h1>
                    <Sidebar clickable={false} wordInfo={goalWordInfo}/>
                </div>
            </div>
        </div> 
    )
}

export default GoalNav