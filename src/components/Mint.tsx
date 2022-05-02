import React from 'react';
import { ethers } from 'ethers';
import mintButton from '../assets/img/mint.png';

interface MintProps {
    contractAddress: string;
    network: string;
    setProvider: Function;
    setSigner: Function;
    setContract: Function;
    abi: Object;
    switchWalletNetwork: Function;
    handleAccountChanged: Function;
    updateEthers: Function;
    getBalanceOf: Function;
    contract: ethers.Contract | null;
    defaultAccount: string | null;
    quantity: number;
    price: number;
}

export default function Mint(props: MintProps) {
    const delay = (interval: number) => {
        return new Promise((resolve) => {
            setTimeout(resolve, interval);
        });
    };

    async function publicMint() {
        console.log('mint');
        try{
            props.switchWalletNetwork(props.network);
            props.updateEthers();
            let pay: (string | number) = props.quantity * props.price;
            pay= pay.toString();
            let transaction= {
                value:ethers.utils.parseEther(pay),
            };
            if (props.contract != null) {
                await props.contract.publicSaleMint(props.quantity,transaction);
            }
           
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