import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TokensInfo } from '../AxiosAPIs';

interface OwnerClaimProps {
    claimContract: ethers.Contract | null;
    defaultAccount: string | null;
    tokenIds: TokensInfo[];
    claimValue: number | undefined;
}

function OwnerClaim(props: OwnerClaimProps) {
    const [canClaim, setCanClaim] = useState<number>(0);
    const [totalClaim, setTotalClaim] = useState<number>(0);
    const [tokensNotClaim, setTokenNotClaim] = useState<TokensInfo[]>([]);

    const ownerClaimAll = async () => {
        if (props.claimContract != null){
            await props.claimContract.nftOwnerClaim(tokensNotClaim)
            .then((res: any) => {
                console.log(res);
            })
            .catch((err: any) => {
                console.log(err);
            })
        } else {
            alert('Please connect contract!')
        }
            
    }

    useEffect(() => {
        const tokensNotClaim = props.tokenIds.filter((token: any) => !token.claimed)
        if (props.claimValue != undefined) {
            setCanClaim(props.claimValue * tokensNotClaim.length);
            setTotalClaim(props.claimValue * props.tokenIds.length);
            setTokenNotClaim(tokensNotClaim);
        }
        setTotalClaim
    }, [props.tokenIds])

    return (
        <div>
            <button type="button" className='mt-5 p-5 bg-gray-400 text-xl rounded-md text-center' onClick={() => ownerClaimAll()} disabled={tokensNotClaim.length == 0}>領取分潤金</button>
            <p>可提領分潤金額：{totalClaim} ETH.</p>
            <p>已提領分潤金額：{totalClaim - canClaim} ETH.</p>
            <p>未提領分潤金額：{canClaim} ETH.</p>
        </div>
    );
}

export default OwnerClaim