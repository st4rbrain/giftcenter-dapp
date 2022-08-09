function ReceivedGiftUI({from, amount, dateTime}) {

    const inMillisecs = Date.parse(dateTime);
    const date = new Date(inMillisecs);
    const formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    const formattedTime = date.getHours()+":"+date.getMinutes();

    return ( 
        <div className="listitem">
            <div className="itemline">
                <div className="linelabel">From</div>
                <div className="linedata">{from}</div>
            </div>
            <div className="itemline">
                <div className="linelabel">Amount</div>
                <div className="linedata">{amount}</div>
            </div>
            <div className="recorddate">
                <div className="datelabel">Date -</div>
                <div className="date">{formattedDate} {formattedTime}</div>
            </div>
        </div>
     );
}

export default ReceivedGiftUI;