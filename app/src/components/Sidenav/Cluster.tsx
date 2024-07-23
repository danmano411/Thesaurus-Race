import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

interface ClusterProps {
    type: string
    data: any
    clickable: boolean
}

const Cluster:React.FC<ClusterProps> = ({
    type,
    data,
    clickable
}) => {

    const [active, setActitve] = useState(true);

    return (
        <div className='flex-shrink ml-4 mr-8 p-2'>
            <div className='flex flex-row justify-between items-center flex-shrink border-b border-b-black'>
                <div className='font-semibold text-xl pb-1'>
                    {type}
                </div>
                <button className='flex-shrink' onClick={() => {setActitve(value => !value)}}>
                    <RiArrowDropDownLine 
                        className={`
                            ${active ? 'rotate-0' : '-rotate-90'}
                            transition
                            duration-200
                        `} 
                        size={28}
                    />
                </button>
            </div>
            
            {active &&
                <div className='flex flex-col gap-0'>
                    {Object.keys(data[1][type]).map((meaning:string, index:number) => (
                        <div key={meaning}>
                            {clickable ? 
                                <a href={`#${type}${index}`} className='flex-1 px-1 pl-2 py-[0.175rem] font-[475] text-xl cursor-pointer hover:text-orange-400 duration-200 active:text-orange-500 transition'>
                                    - as in {meaning}
                                </a>
                            :
                                <div className='flex-1 px-1 pl-2 py-[0.175rem] font-[475] text-xl'>
                                    - as in {meaning}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Cluster