import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

function OwnerClaim(props: any) {
    const [canClaim, setCanClaim] = useState(0);
    const [totalClaim, setTotalClaim] = useState(0);
    const [tokensNotClaim, setTokenNotClaim] = useState([]);

    const ownerClaimAll = async () => {
        await props.claimContract.nftOwnerClaim(tokensNotClaim)
        .then((res: any) => {
            console.log(res);
        })
        .catch((err: any) => {
            console.log(err);
        })
        
    }

    useEffect(() => {
        const tokensNotClaim = props.tokens.filter((token: any) => !token.claimed)
        setCanClaim(props.claimValue * tokensNotClaim.length);
        setTotalClaim(props.claimValue * props.tokens.length);
        setTokenNotClaim(tokensNotClaim);
        // setTotalClaim
    }, [props.tokens])

    return (
        <div>
            <button type="button" className='mt-5 p-5 bg-gray-400 text-xl rounded-md text-center' onClick={() => ownerClaimAll()} disabled={tokensNotClaim.length===0}>Owner Claim</button>
            <p>可提領分潤金額：{totalClaim} ETH.</p>
            <p>已提領分潤金額：{totalClaim - canClaim} ETH.</p>
            <p>未提領分潤金額：{canClaim} ETH.</p>
        </div>
    );
}

export default OwnerClaim