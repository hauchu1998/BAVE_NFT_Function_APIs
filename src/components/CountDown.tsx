import { defaults } from 'autoprefixer';
import React, {useState, useEffect} from 'react'

export default function CountDown(props) {
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const deadline = props.deadline;

    const leadingZero = (num) => {
        return num < 10? "0"+num : num; 
    }

    const getTimeInterval = (deadline) => {
        let timeInterval = Date.parse(deadline) - Date.parse(new Date());

        if (timeInterval < 0) {
            setDay(0);
            setHour(0);
            setMinute(0);
            setSecond(0);
        } else {
            setDay(Math.floor(timeInterval / (1000 * 60 * 60 * 24)));
            setHour(Math.floor((timeInterval / (1000 * 60 * 60)) % 24));
            setMinute(Math.floor((timeInterval / 1000 / 60) % 60));
            setSecond(Math.floor((timeInterval / 1000) % 60));
        }
    }

    useEffect(() => {
        setInterval(() => getTimeInterval(deadline), 1000);
        return () => {getTimeInterval(deadline)}
    }, [deadline]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className='w-1/2 flex justify-center space-x-2 md:space-x-5 h-[8vh] lg:h-[12vh] md:h-[10vh] mt-5'>
                <div className='rounded-lg opacity-50 shadow-2xl  w-1/4 text-center text-2xl'><p id='day' >{leadingZero(day)} DAYs</p></div>
                <div className='rounded-lg opacity-50 shadow-2xl  w-1/4 text-center text-2xl'><p id='hour'>{leadingZero(hour)} HRs</p></div>
                <div className='rounded-lg opacity-50 shadow-2xl  w-1/4 text-center text-2xl'><p id='minute'>{leadingZero(minute)} MINs</p></div>
                <div className='rounded-lg opacity-50 shadow-2xl  w-1/4 text-center text-2xl'><p id='second'>{leadingZero(second)} SECs</p></div>
            </div>
        </div>
    );
}