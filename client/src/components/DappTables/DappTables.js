import { ethers } from 'ethers';
import { useState } from 'react';
import ReceivedGiftUI from '../dappReceivedGift';
import SentGiftUI from '../dappSentGift';
import './DappTables.css';

  
function GiftsTables({contract, sentData, receivedData}) {

    const [address, setAddress] = useState();
    const [msg, setMsg] = useState();
    const [amount, setAmount] = useState();
        
    const sendgift = async () => {
        try{
            await contract.sendGift(address, msg, {value: ethers.utils.parseEther(amount)});
            console.log("Sent successfully");
        } catch(error) {
            if (error.code === 4001){
                console.log("Transaction Rejected");
            } else {
                alert("Invalid Data");
            }
        }
    }

    return ( 
        <div className="giftstables">
            <div className="dappcontainer">
                <div className="table">
                    <div className="tableheader">
                        <div className="tabletitle">Gifts Sent</div>
                        <div className="tableinfo">This tables lists all of the gifts that are sent</div>
                    </div>
                    <div className="list">
                        {
                            sentData.slice(0, 3).map((data) => <SentGiftUI key={data.id} to={data.recipient_address} amount={data.amount} dateTime={data.createdAt}></SentGiftUI>)
                        }
                    </div>
                </div>
                <div className="sendgift">
                    <div className="cardheading">Send Gift</div>
                    <div className="card">
                        <div className="cardline">
                            <div className="cardlinelabel">Recipient Address</div>
                            <input className="cardlineinput" id="address" autoComplete='off' onChange={(e) => {
                                setAddress(e.target.value);
                            }}></input>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Message</div>
                            <textarea className="cardlinemsginput" id="message" autoComplete='off' onChange={(e) => {
                                setMsg(e.target.value);
                            }}></textarea>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Amount</div>
                            <input className="cardlineinput" id="amount" autoComplete='off' onChange={(e) => {
                                setAmount(e.target.value);
                            }}></input>
                        </div>
                    </div>
                    <button className="sendbtn" onClick={sendgift}>Send Gift</button>
                </div>
                <div className="table">
                    <div className="tableheader">
                        <div className="tabletitle">Gifts Received</div>
                        <div className="tableinfo">This tables lists all of the gifts that are sent</div>
                    </div>
                    <div className="list">
                        {/* <div className="listitem">
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
                        </div><div className="listitem">
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
                        </div> */}
                        {
                            receivedData.slice(0, 3).map((data) => <ReceivedGiftUI key={data.id} from={data.sender_address} amount={data.amount} dateTime={data.createdAt}></ReceivedGiftUI>)
                        }
                    </div>
                </div>
            </div>
        </div>
     );
}

export default GiftsTables;