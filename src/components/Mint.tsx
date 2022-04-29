import React from 'react';
import { ethers } from 'ethers';
import mintButton from '../assets/img/mint.png';

export default function Mint(props) {
    const delay = (interval) => {
        return new Promise((resolve) => {
            setTimeout(resolve, interval);
        });
    };

    async function publicMint() {
        console.log('mint');
        try{
            props.switchWalletNetwork(props.network);
            props.updateEthers();
            let pay= props.quantity * props.price;
            pay= pay + '';
            let transaction= {
                value:ethers.utils.parseEther(pay),
            };
            await props.contract.publicSaleMint(props.quantity,transaction);
            // await delay(20000);
            await props.getBalanceOf();

        } catch (mintError) {
            console.log(mintError)
        }
    }

    return (
        <div>
            <button type="button" onClick={publicMint}><img src={mintButton} alt="mint button" /></button>
        </div>
    );
}