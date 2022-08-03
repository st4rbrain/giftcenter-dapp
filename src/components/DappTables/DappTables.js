import './DappTables.css';

function GiftsTables() {
    return ( 
        <div className="giftstables">
                <div className="dappcontainer">
                    <div className="table">
                        <div className="tableheader">
                            <div className="tabletitle">Gifts Sent</div>
                            <div className="tableinfo">This tables lists all of the gifts that are sent</div>
                        </div>
                        <div className="list">
                            <div className="listitem">
                                <div className="itemline">
                                    <div className="linelabel">From</div>
                                    <div className="linedata">0x98xsfgas248345j3h5jkll34523h71</div>
                                </div>
                                <div className="itemline">
                                    <div className="linelabel">Amount</div>
                                    <div className="linedata">5000</div>
                                </div>
                                <div className="recorddate">
                                    <div className="datelabel">Date -</div>
                                    <div className="date">01/12/2021</div>
                                </div>
                            </div>
                            <div className="listitem">
                                <div className="itemline">
                                    <div className="linelabel">From</div>
                                    <div className="linedata">0x98xsfgas248345j3h5jkll34523h71</div>
                                </div>
                                <div className="itemline">
                                    <div className="linelabel">Amount</div>
                                    <div className="linedata">5000</div>
                                </div>
                                <div className="recorddate">
                                    <div className="datelabel">Date -</div>
                                    <div className="date">01/12/2021</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="sendgift">
                        <div className="cardheading">Send Gift</div>
                        <div className="card">
                            <div className="cardline">
                                <div className="cardlinelabel">Recipient Address</div>
                                <input className="cardlineinput" id="address"></input>
                            </div>
                            <div className="cardline">
                                <div className="cardlinelabel">Message</div>
                                <input className="cardlineinput" id="message"></input>
                            </div>
                            <div className="cardline">
                                <div className="cardlinelabel">Amount</div>
                                <input className="cardlineinput" id="amount"></input>
                            </div>
                        </div>
                        <button className="sendbtn">Send Gift</button>
                    </div>
                    <div className="table">
                        <div className="tableheader">
                            <div className="tabletitle">Gifts Received</div>
                            <div className="tableinfo">This tables lists all of the gifts that are sent</div>
                        </div>
                        <div className="list">
                            <div className="listitem">
                                <div className="itemline">
                                    <div className="linelabel">From</div>
                                    <div className="linedata">0x98xsfgas248345j3h5jkll34523h71</div>
                                </div>
                                <div className="itemline">
                                    <div className="linelabel">Amount</div>
                                    <div className="linedata">5000</div>
                                </div>
                            </div>
                            <div className="listitem">
                                <div className="itemline">
                                    <div className="linelabel">From</div>
                                    <div className="linedata">0x98xsfgas248345j3h5jkll34523h71</div>
                                </div>
                                <div className="itemline">
                                    <div className="linelabel">Amount</div>
                                    <div className="linedata">5000</div>
                                </div>
                            </div><div className="listitem">
                                <div className="itemline">
                                    <div className="linelabel">From</div>
                                    <div className="linedata">0x98xsfgas248345j3h5jkll34523h71</div>
                                </div>
                                <div className="itemline">
                                    <div className="linelabel">Amount</div>
                                    <div className="linedata">5000</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default GiftsTables;