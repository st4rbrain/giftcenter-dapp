import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import './DappTables.css';


const GiftCenterABI = [
    "function sendGift(address _recipient, string memory _message) public payable"
  ]


function GiftsTables() {

    const [address, setAddress] = useState();
    const [msg, setMsg] = useState();
    const [amount, setAmount] = useState();
    const [contract, setContract] = useState();

    useEffect(() => {
        const loadProvider = () => {
          // const url = 'https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco';
          const giftcenterAddress = '0x6b4e288d1a27ffa6f1e4BDc5F5C8804Bfa053062';
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, signer);

          setContract(contract);

        }
        if (window.ethereum) {
            loadProvider();
        } else {
            console.log("Install Metamask");
        }
        
      }, []);
    
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
                            <input className="cardlineinput" id="address" onChange={(e) => {
                                setAddress(e.target.value);
                                console.log(e.target.value);
                            }}></input>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Message</div>
                            <input className="cardlineinput" id="message" onChange={(e) => {
                                setMsg(e.target.value);
                                console.log(e.target.value);
                            }}></input>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Amount</div>
                            <input className="cardlineinput" id="amount" onChange={(e) => {
                                setAmount(e.target.value);
                                console.log(e.target.value);
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
                        </div>
                    </div>
                </div>
            </div>
            {amount}
        </div>
     );
}

export default GiftsTables;