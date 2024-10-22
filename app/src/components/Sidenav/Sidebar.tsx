import React from 'react'
import Cluster from './Cluster'

interface SidebarProps {
    wordInfo: any,
    clickable: boolean
}

const Sidebar:React.FC<SidebarProps> = ({
    wordInfo,
    clickable
}) => {
    const data = wordInfo;

    return (
        <div className='
            flex flex-col w-[19.25rem] h-full justify-start gap-3
        '>
            {Object.keys(data[1]).map((type) =>(
                <Cluster type={type} clickable={clickable} key={data[0] + type} data={data} />
            ))}
        </div>
    )
}

export default Sidebar