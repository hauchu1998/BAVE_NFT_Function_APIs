import { ethers } from "ethers";

export interface NFTProp{
    claimYear: number;
    contractAddress: string;
    claimAddress?: string;
    network: string;
    deadline: string;
    price: number;
    provider: ethers.providers.Web3Provider;
}

