import React from "react";
import './RecentGift.css';

function RecentGift({from, to, amount, token, dateTime}) {

    const inMillisecs = Date.parse(dateTime);
    const date = new Date(inMillisecs);
    const formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    const formattedTime = date.getHours()+":"+date.getMinutes();

    return(
        <div>
            <div className='recentgift'>
                <div className='recentgiftline'>
                    <div className='recentgiftlabel'>From</div>
                    <div className='recentgiftdata'>{from}</div>
                </div>
                <div className='recentgiftline'>
                    <div className='recentgiftlabel'>To</div>
                    <div className='recentgiftdata'>{to}</div>
                </div>
                <div className='recentgiftline'>
                    <div className='recentgiftlabel'>Amount</div>
                    <div className='recentgiftamount'>{amount}<span className="token">{token}</span></div>
                </div>
                <div className="recentgiftdate">
                    <div className="rgdatelabel">{formattedDate} {formattedTime}</div>
                </div>
            </div>
        </div>
    );
}

export default RecentGift;