import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TokensInfo } from '../AxiosAPIs';

interface OwnerClaimProps {
    claimContract: ethers.Contract | null;
    defaultAccount: string | null;
    tokens: TokensInfo[];
    claimValue: number | undefined;
}

function OwnerClaim(props: OwnerClaimProps) {
    // const [canClaim, setCanClaim] = useState<number>(0);
    // const [totalClaim, setTotalClaim] = useState<number>(0);
    const [tokenSelection, setTokenSelection] = useState<number[]>([])

    const selectToken = (tokenId: number) => {
        var tempTokenSelection = []
        if (tokenSelection.indexOf(tokenId) != -1) {
            tempTokenSelection = tokenSelection.filter((token: number) => token != tokenId);
        } else {
            tempTokenSelection = [...tokenSelection, tokenId];
        }
        setTokenSelection(tempTokenSelection);
    }

    const ownerClaimAll = async () => {
        if (props.claimContract != null) {
            await props.claimContract.nftOwnerClaim([14, 15]) //tokenSelection
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

    return (
        <div>
            {props.tokens.length > 0 ?
                <div className="pt-10 text-center flex justify-center items-center">
                    <ul className='gap-2 flex '>
                        {props.tokens.map((token) => {
                            return (
                                <li key={"token" + token.tokenId}
                                    id={token.tokenId + ''}
                                    className="flex item-center"
                                >
                                    <button
                                        onClick={() => selectToken(token.tokenId)}
                                        className={`text-xl w-10 h-10 ${token.claimed ? "bg-red-200 text-red-500 border-1 border-red-500" : "bg-green-200 text-green-400 border-1 border-green-400"}`}
                                    >
                                        {token.tokenId}
                                    </button>
                                </li>)
                        })}
                    </ul>
                </div> : null}
            <button type="button" className='mt-5 p-5 bg-gray-400 text-xl rounded-md text-center' onClick={() => ownerClaimAll()} disabled={props.tokens.filter((token: TokensInfo) => !token.claimed).length == 0}>領取分潤金</button>
            {/* <p>可提領分潤金額：{totalClaim} ETH.</p>
            <p>已提領分潤金額：{totalClaim - canClaim} ETH.</p>
            <p>未提領分潤金額：{canClaim} ETH.</p> */}
        </div>
    );
}

export default OwnerClaim