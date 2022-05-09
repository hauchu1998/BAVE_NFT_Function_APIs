import { ethers } from 'ethers'
import React, {useState} from 'react'
import abi from '../lala_abi.json';
import claimAbi from '../lala_claim_abi.json';

import Mint from './Mint';
import ConnectWallet from './ConnectWallet';
import NftQuantity from './NftQuantity';
import CountDown from './CountDown';
import BindAccount from './BindAccount';
import OwnerClaim from './OwnerClaim';
import GetCoupons from './GetCoupons';
import { getServerTokenApi, TokensInfo } from '../AxiosAPIs';

const envVariables = import.meta.env;

// console.log('http://localhost:3030/api/api/get_token'.replace(/^\/api/, ''))

const networkTable = {
    "0x1": "Ethereum Main Network (Mainnet)",
    "0x3": "Ropsten Test Network",
    "0x4": "Rinkeby Test Network",
    "0x5": "Georli Test Network",
    "0x2a": "Kovan Test Network",
    "0x13881": "Mumbai Test Network"
}
getServerTokenApi()

function NFT() {
    const claimYear = envVariables.VITE_CLAIM_YEAR;
    const contractAddress = envVariables.VITE_CONTRACT_ADDRESS // lala電商 contract address
    const claimAddress = envVariables.VITE_CLAIM_ADDRESS//
    const network = envVariables.VITE_NETWORK; // lala電商 Polygon Test Network (Mumbai)
    const deadline = envVariables.VITE_DEADLINE;
    const price = envVariables.VITE_PUBLIC_PRICE; // 0.01Eth 10^16Wei
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
    const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [claimContract, setClaimContract] = useState<ethers.Contract | null>(null);
    const [defaultAccount, setDefaultAccount] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [tokens, setTokens] = useState<TokensInfo[]>([]);
    const [claimValue, setClaimValue] = useState<number | undefined>(undefined);

    async function plusQuantity() {
        let result = quantity + 1;
        setQuantity(result);
    }

    async function minusQuantity() {
        if (quantity > 0) {
            let result = quantity - 1;
            setQuantity(result);
        }
    }

     // const checkCurrentNetwork = (chainId) => {
    //     console.log(chainId)
    //     if (chainId != network) {
    //         alert('Please change to ' + networkTable[network] + "!");
    //     }
    // }
    
    const switchWalletNetwork = async (network: any) => {
        try{
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: network}]
            });
        } catch (switchError) {
            console.log(switchError);
            // if (switchError.code === 4902) {
            //     try {
            //         await window.ethereum.request({
            //             method: "wallet_addEthereumChain",
            //             params: [
            //                 {
            //                     chainId:0x13881,
            //                     chainName: "Mumbai",
            //                     nativeCurrency: {
            //                         symbol: "MATIC",
            //                     },
            //                     rpcUrls: ["https://rpc-mumbai.matic.today"],
            //                     blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            //                 }
            //             ]
            //         });
            //     } catch (addError) {
            //         console.log(addError);
            //     }
            // }
        }
    }

    const handleAccountChanged = (account: string) => {
        console.log('handle account: ' + account);
        setDefaultAccount(account);
    }
    
    const updateEthers = async () => {
        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempProvider);

        // await tempProvider.send("eth_requestAccounts", [])
        // .then((res) => {
        //     handleAccountChanged(res[0]);
        // });
        // await tempProvider.getNetwork().then((res) => console.log(res));


        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);

        const tempContract = new ethers.Contract(contractAddress, abi, tempSigner);
        setContract(tempContract);

        const name = await tempContract.name();
        console.log("Success connect contract: ", name);

        const tempClaimContract = new ethers.Contract(claimAddress, claimAbi, tempSigner)
        setClaimContract(tempClaimContract);
        var tempClaimValue = await tempClaimContract.claimValue();
        tempClaimValue = Number(ethers.utils.formatEther(tempClaimValue.toString()));
        setClaimValue(tempClaimValue);
        console.log("Success connect contract: ", tempClaimContract.address);

    }

    const checkClaimed = async (tokens:TokensInfo[]) => {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < tokens.length; i++) {
                if (claimContract != null) {
                    claimContract.Claimed(claimYear, tokens[i].tokenId)
                    .then((claimed: boolean) => {
                        tokens[i] = {...tokens[i], claimed: claimed};
                    })
                    .catch((err: any) => {
                        return reject(err);
                    })
                }
            }
            return resolve(tokens);
        })
    }

    const getBalanceOf = async (tempTokens: TokensInfo[]) => {
        console.log('get balance: ' + defaultAccount, tempTokens);
        var updateTokens: TokensInfo[] = [];
        if (contract != null && claimContract != null) {
            // let val = await contract.balanceOf(defaultAccount);
            // for (let i = 0; i < tempTokens.length; i++) {
                // await contract.tokenOfOwnerByIndex(defaultAccount, count)
                // .then((res: { toNumber: () => number; }) => {
                //     tokenId = res.toNumber()
                // })
            // }
            await checkClaimed(tempTokens)
            .then((tempTokens: any) => {
                updateTokens = tempTokens;
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            alert("please connect wallet");
        }
        return updateTokens;
    }

    return (
        <div className="items-center">
            <Mint 
                contractAddress={contractAddress}
                network={network}
                setProvider={setProvider}
                setSigner={setSigner}
                setContract={setContract}
                abi={abi}
                switchWalletNetwork={switchWalletNetwork}
                handleAccountChanged={handleAccountChanged}
                updateEthers={updateEthers}
                getBalanceOf={getBalanceOf}
                contract={contract}
                defaultAccount={defaultAccount}
                quantity={quantity}
                price={price}
            />
            <ConnectWallet 
                defaultAccount={defaultAccount}
                network={network}
                networkTable={networkTable}
                switchWalletNetwork={switchWalletNetwork}
                handleAccountChanged={handleAccountChanged}
                updateEthers={updateEthers}
                getBalanceOf={getBalanceOf}
            />
            <NftQuantity 
                quantity={quantity}
                plusQuantity={plusQuantity}
                minusQuantity={minusQuantity}
            />
            <CountDown deadline={deadline} />
            <BindAccount 
                defaultAccount={defaultAccount}
                contract={contract}
                getBalanceOf={getBalanceOf}
                setTokens={setTokens}
                tokens={tokens}
            />
            <OwnerClaim
                claimContract={claimContract}
                defaultAccount={defaultAccount}
                tokens={tokens}
                claimValue={claimValue}
            />
            <GetCoupons
                defaultAccount={defaultAccount}
                tokens={tokens}
            />
        </div>
    );
}

export default NFT;