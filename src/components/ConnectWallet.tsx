import React, { useEffect, useState } from 'react';
import connectWalletButton from '../assets/img/collectWallet.png';

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
            
            return props.switchWalletNetwork(props.network);
        })
        .then(() => {
            return props.updateEthers();
        })
        .then(() => {
            alert('Wallet Connected');
        })
        .catch((err:any) => {
            console.log(err);
        })
        setConnect(true);
    }

    async function checkIfWalletIsConnected() {
        if (window.ethereum && isMobile()) {
            const account = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (account) {
                props.handleAccountChanged(account);
                setConnect(true);
                return;
            }

            if (isMobile()) {
                await connectWallet();
            }
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);


    return isMobile() && !window.ethereum?
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
                    <img src={connectWalletButton} alt="collectWallet" />
                </button>
            </div>
        );
}
