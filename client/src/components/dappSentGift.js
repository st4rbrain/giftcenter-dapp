function SentGiftUI({to, from, amount, msg, dateTime, id, token, txHash}) {

    const inMillisecs = Date.parse(dateTime);
    const date = new Date(inMillisecs);
    const formattedDate = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
    const formattedTime = date.getHours()+":"+date.getMinutes();
    
    const setId = id+token

    const etherscanLink = "https://goerli.etherscan.io/tx/" + txHash
    const polygonscanLink = "https://mumbai.polygonscan.com/tx/" + txHash

    const showGiftDetails = () => {
        document.getElementById(setId).style.display = "block";
    }

    return ( 
        <div>
            <div className="listitem">
                <div className="itemline">
                    <div className="linelabel">To</div>
                    <div className="linedata">{to}</div>
                </div>
                <div className="itemline">
                    <div className="linelabel">Amount</div>
                    <div className="lineamtdata">{amount} {token}</div>
                </div>
                <div className="itemline">
                    <div className="recorddate">
                        <div className="datelabel">Date -</div>
                        <div className="date">{formattedDate} {formattedTime}</div>
                    </div>
                    <button className="giftdetail" onClick={showGiftDetails}>
                        <span className="detailbtnlabel">Details</span>
                        <div className="detailbtn"></div>
                    </button>
                </div>
            </div>
            <div className="detailmodal" id={setId}>
                <div className="detailmodal-content">
                    <div className="detailmodalhead">
                        <div className="detailmodalheading">Gift Details</div>
                        <button className="detailmodalcross" onClick={() => {
                            document.getElementById(setId).style.display = "none";
                        }
                        }>&times;</button>
                    </div>
                    <div className="detailmodalgiftdetails">
                        <div className="detailline">
                            <div className="detaillabel">From:</div>
                            <div className="detailvalue">{from}</div>
                        </div>
                        <div className="detailline">
                            <div className="detaillabel">To:</div>
                            <div className="detailvalue">{to}</div>
                        </div>
                        <div className="detailline">
                            <div className="detaillabel">Message:</div>
                            <div className="detailmsgvalue">{msg}</div>
                        </div>
                        <div className="detailline">
                            <div className="detaillabel">Amount:</div>
                            <div className="detailvalue">{amount} {token}</div>
                        </div>
                        <div className="detailline">
                            <div className="detaillabel">Date:</div>
                            <div className="detailvalue">{formattedDate} {formattedTime}</div>
                        </div>
                        <div className="detailline">
                            <div className="detaillabel">TxHash:</div>
                            <div className="detailvalue"><a rel="noreferrer" href={token === "mMATIC" ? polygonscanLink : etherscanLink} target="_blank" >{token === "mMATIC" ? polygonscanLink : etherscanLink}</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default SentGiftUI;