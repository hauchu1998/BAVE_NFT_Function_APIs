import React from 'react';

interface NftQuantityProps {
    quantity: number;
    plusQuantity: Function;
    minusQuantity: Function;
}

export default function NftQuantity(props: NftQuantityProps) {
    return (
        <div className="w-full flex flex-col items-center">
            <div className='flex justify-center md:space-x-10 [h-[4vh]] [md:h-[8vh]] [lg:h-[10vh]] lg:pb-2 my-2 lg:my-5 md:my-3'>
                <button type="button" className="text-gray-400 text-4xl md:text-7xl w-20 rounded-full" onClick={() => props.minusQuantity}><i className="fa-solid fa-minus"></i></button>
                <p className='text-[#80ffff] text-xl  2xl:text-6xl xl:text-6xl lg:text-6xl md:text-4xl pt-1 lg:pt-2 md:pt-3'>{props.quantity}</p>
                <button type="button" className="text-gray-400 text-4xl md:text-7xl w-20 rounded-full" onClick={() => props.plusQuantity}><i className="fa-solid fa-plus"></i></button>
            </div>
        </div>
        
    );
}