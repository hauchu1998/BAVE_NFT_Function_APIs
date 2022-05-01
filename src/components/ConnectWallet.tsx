import React, { useEffect, useState } from 'react';
import connecttWalletButton from '../assets/img/collectWallet.png';

interface ConnectWalletProps {
    defaultAccount: string | null;
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
    // await window.ethereum.request({ method: 'eth_chainId' })
    // .then((res) => {
    //     console.log(res);
    // })
    const [connect, setConnect] = useState<boolean>(false)
    const isMobile = () => {
        return 'ontouchstart' in window || 'onmsgesturechange' in window;
    }

    async function connectWallet() {
        if (!window.ethereum) {
            alert('Please install MetaMask browser extension!');
            return;
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then((accounts: any[]) => {
            props.handleAccountChanged(accounts[0]);
            props.switchWalletNetwork(props.network);
            props.updateEthers();
            alert('Wallet Connected')
        })
        setConnect(true);
    }

    // async function checkIfWalletIsConnected() {
    //     if (window.ethereum) {
    //         const accounts = await window.ethereum.request({
    //             method: "eth_accounts",
    //         });

    //         if (accounts.length > 0) {
    //             props.handleAccountChanged(accounts[0]);
    //             setConnect(true);
    //             return;
    //         }

    //         if (isMobile()) {
    //             await connectWallet();
    //         }
    //     }
    // }

    // useEffect(() => {
    //     checkIfWalletIsConnected();
    // }, []);


    return isMobile() ?
        (
            <div>
                <button type="button" className="bg-[url('/src/assets/img/collectWallet.png')]" disabled={connect}>
                    <a href={"https://metamask.app.link/dapp/" + import.meta.env.VITE_DAPP_URL}></a>
                </button>
            </div>

        )
        :
        (
            <div>
                <button type="button" onClick={connectWallet} disabled={connect}>
                    <img src={connecttWalletButton} alt="collectWallet" />
                </button>
            </div>
        );
}