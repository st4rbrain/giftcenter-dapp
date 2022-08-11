import React from "react";
import './TopGift.css';

function TopGift({from, to, amount, token, dateTime}) {
    const inMillisecs = Date.parse(dateTime);
    const date = new Date(inMillisecs);
    const formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    const formattedTime = date.getHours()+":"+date.getMinutes();
        
    return(
        <div>
            <div className='topgift'>
                <div className='topgiftline'>
                    <div className='topgiftlabel'>From</div>
                    <div className='topgiftdata'>{from}</div>
                </div>
                <div className='topgiftline'>
                    <div className='topgiftlabel'>To</div>
                    <div className='topgiftdata'>{to}</div>
                </div>
                <div className='topgiftline'>
                    <div className='topgiftlabel'>Amount</div>
                    <div className='topgiftamount'>{amount}<span className="token">{token}</span></div>
                </div>
                <div className="topgiftdate">
                    <div className="tgdatelabel">{formattedDate} {formattedTime}</div>
                </div>
            </div>
        </div>
    );
}

export default TopGift;