import React from "react";
import './RecentGift.css';

function RecentGift({from, to, amount}) {

    
    return(
        <div>
            <div className='gift'>
            <div className='giftline'>
                <div className='label'>From</div>
                <div className='giftdata'>{from}</div>
            </div>
            <div className='giftline'>
                <div className='label'>To</div>
                <div className='giftdata'>{to}</div>
            </div>
            <div className='giftline'>
                <div className='label'>Amount</div>
                <div className='giftdata'>{amount}</div>
            </div>
            </div>
        </div>
    );
}

export default RecentGift;