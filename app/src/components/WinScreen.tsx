import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";

interface WinScreenProps {
  isOpen: boolean
  startWord: string
  goalWord: string
  time: string
  bestPath?: string
  transversed: number
  difficulty: string
  path: string
  closeCallback: () => void
  generationCallback: () => void
}


const WinScreen:React.FC<WinScreenProps> = ({
  isOpen,
  startWord,
  goalWord,
  time,
  bestPath,
  transversed,
  difficulty,
  path,
  closeCallback,
  generationCallback,
}) => {

  const handleClose = () => {
    closeCallback();
  }

  const handleShare = () => {
  }

  const handleNextGame = () => {
    closeCallback();
    generationCallback();
  }

  const [disabled, setDisabled] = useState(!isOpen);

  useEffect(() => {
    if (!isOpen){
      setTimeout(() => {
        setDisabled(value => !value)
      }, 200)
    }
    else {
      setDisabled(value => !value)
    }
  }, [isOpen])

  return (
    <div className={`top-0 fixed flex flex-row w-screen h-screen bg-neutral-500/60 justify-center items-center ${disabled ? 'z-20' : '-z-10'} ${isOpen ? 'opacity-100' : 'opacity-0'} transition duration-200`}>
        <div className={`flex-shrink w-1/2 h-3/4 bg-white rounded-3xl p-10 flex flex-col gap-4 ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition duration-200`}>
            <div className='flex-shrink flex flex-row justify-between items-center w-full border-b-2 border-black pt-2 pb-4'>
                <h1 className='flex-1 text-6xl text-center'>You Win!</h1>
                {/* <div className='flex-1 flex flex-row justify-end'>
                  <button className='flex-shrink rounded-full bg-white hover:bg-neutral-200/50 transition duration-200 p-1 active:bg-neutral-300/60' onClick={handleClose}><IoMdClose size={50}/></button>
                </div> */}
            </div>
            <div className='flex-shrink flex flex-col px-10 mb-2 mt-14 items-center h-full gap-10 justify-between'>
              <h1 className='text-4xl flex-shrink'><span className='font-semibold'>{startWord}</span> ---------{`>`} <span className='font-semibold'>{goalWord}</span></h1>
              <div className='flex-shrink flex flex-col gap-6 px-10 justify-center items-center'>
                <Line label='Difficulty' value={difficulty}/>
                <Line label='Time' value={time!=="" ? time+" ms" : "Error Fetching Time"}/>
                <Line label='Words Transversed' value={transversed}/>
                <Line label='Path' value={path}/>
                {bestPath && <Line label='Best Path' value={bestPath}/>}
              </div>
              <div className='flex-shrink w-full flex flex-row justify-center items-center gap-14 px-10'>
                <button className='p-4 border-2 rounded-3xl border-blue-500 bg-blue-500 flex-1 text-white flex flex-row justify-center items-center gap-4 cursor-not-allowed' disabled onClick={handleShare}>
                  <h2 className='text-xl'>Share</h2> 
                  <CiShare2 size={24}/>
                </button>
                <button className='p-4 border-2 rounded-3xl border-blue-500 bg-white flex-1 text-blue-500 flex flex-row justify-center items-center' onClick={handleNextGame}>
                  <h2 className='text-xl flex-shrink'>New Game</h2> 
                </button>
              </div>
            </div>
        </div>
    </div>
  )
}

interface LineProps {
  label: string
  value: string | number
}

const Line:React.FC<LineProps> = ({
  label,
  value
}) => {
  return (
    <div className='w-full h-fit flex-shrink flex flex-row justify-center text-2xl gap-4'>
      <h1 className='flex-shrink font-semibold'>{label}:</h1>
      <h1 className='flex-shrink'>{value}</h1>
    </div>
  )
}

export default WinScreen