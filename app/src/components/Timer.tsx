
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface TimerProps {
    startTime: number
    active: boolean
    setTimeCallback: Dispatch<SetStateAction<string>>
}

const Timer:React.FC<TimerProps> = ({
    startTime,
    active,
    setTimeCallback
}) => {
    // const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [milliseconds, setMilliseconds] = useState(0);
    const [timerInterval, setTimerInterval] = useState<any>();

    const getTime = () => {
        const time = Date.now() - startTime;
    
        // setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
        setMilliseconds(Math.floor(time % 1000 /10))

        console.log(Date.now());
    };

    const resetTimer = () => {
        // setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMilliseconds(0)
        clearInterval(timerInterval);
    }

    useEffect(() => {
        resetTimer();
        setTimerInterval(setInterval(() => getTime(), 10));
        return () => clearInterval(timerInterval);
    }, [startTime])

    useEffect(() => {
        if (active === false){
            getTime();
            let time:string = "";
            if (hours < 10){
                time += "0";
            }
            time += hours.toString() + " : ";
            if (minutes < 10){
                time += "0";
            }
            time += minutes.toString() + " : ";
            if (seconds < 10){
                time += "0";
            }
            time += seconds.toString() + " : ";
            if (milliseconds < 10){
                time += "0";
            }
            time += milliseconds.toString();
            setTimeCallback(time);
            resetTimer();
        }
    }, [active]);

    return (
        <div className='flex-shrink w-1/12 py-2 px-2 flex flex-row justify-between items-center rounded-2xl border-2 border-black font-semibold gap-1 text-center'>            
            <h1 className='flex-1'>{hours>=10 ? hours : '0'+hours}</h1>:
            <h1 className='flex-1'>{minutes>=10 ? minutes : '0'+minutes}</h1>:
            <h1 className='flex-1'>{seconds>=10 ? seconds : '0'+seconds}</h1>:
            <h1 className='flex-1'>{milliseconds>=10 ? milliseconds : '0'+milliseconds}</h1>
        </div>
    )
}

export default Timer