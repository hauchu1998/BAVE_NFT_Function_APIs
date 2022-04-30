import React, { useEffect } from 'react';
import connecttWalletButton from '../assets/img/collectWallet.png';

interface ConnectWalletProps {
    network: string;
    networkTable: Object;
    switchWalletNetwork: Function;
    handleAccountChanged: Function;
    updateEthers: Function;
    getBalanceOf: Function;
}

export default function ConnectWallet(props: ConnectWalletProps) {
    // window.ethereum.on('connect', (chainId) => {console.log(chainId)});
    // window.ethereum.on('chainChanged', handleAccountChanged);

    async function connectWallet() {
        console.log('connect wallet');
        if (window.ethereum) {
            await window.ethereum.request({method: 'eth_requestAccounts'})
            .then((res: any[]) => {
                props.handleAccountChanged(res[0]);
                props.switchWalletNetwork(props.network);
                props.updateEthers();
                alert('Wallet Connected')
            })
            .catch((err: any) => {
                if (err.code === 4001) {
                    alert('Please connect to Metamask!')
                } else {
                    console.log(err);
                };
            })

            // await window.ethereum.request({ method: 'eth_chainId' })
            // .then((res) => {
            //     console.log(res);
            // })
        } else {
            console.log('Need to install MetaMask');
            alert('Please install MetaMask browser extension to interact');
        }
    }

    // useEffect(() => {
    //     connectWallet();
    // }, []);

    return (
        <div>
            <button type="button" onClick={connectWallet}><img src={connecttWalletButton} alt="collectWallet"/></button>
        </div>
    );
}