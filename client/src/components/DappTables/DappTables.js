import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import ReceivedGiftUI from '../dappReceivedGift';
import SentGiftUI from '../dappSentGift';
import { SendGiftNotification, GiftYourselfNotification, UnsupportedNetworkNotification } from '../notification';
import { ComingSoonNetworkNotification, InvalidDataNotification, ShortMsgNotification } from '../notification';
import './DappTables.css';

  
function GiftsTables({contract, sentData, receivedData, allowedToSend, account, chainSymbols, loading}) {

    const [address, setAddress] = useState();
    const [msg, setMsg] = useState();
    const [amount, setAmount] = useState();

    const giftsPerPage = 3;

    const totalSentPages = Math.ceil(sentData.length / giftsPerPage)
    const totalReceivedPages = Math.ceil(receivedData.length / giftsPerPage)
    const [currentSentPage, setCurrentSentPage] = useState(0);
    const [currentReceivedPage, setCurrentReceivedPage] = useState(0);
    const [sendGiftNotificationVisible, setSendGiftNotificationVisible] = useState(false)
    const [giftYourselfNotification, setGiftYourselfNotification] = useState(false)
    const [unsupportedNetworkNotification, setUnsupportedNetworkNotification] = useState(false)
    const [comingSoonNetworkNotificationVisible, setComingSoonNetworkNotificationVisible] = useState(false)
    const [invalidDataNotificationVisible, setInvalidDataNotificationVisible] = useState(false)
    const [shortMsgNotificationVisible, setShortMsgNotificationVisible] = useState(false)

        
    const sendgift = async () => {
        setInvalidDataNotificationVisible(false);
        setUnsupportedNetworkNotification(false);
        setComingSoonNetworkNotificationVisible(false);
        setSendGiftNotificationVisible(false);
        setGiftYourselfNotification(false)
        if(allowedToSend) {            
            const checkNetwork = async () => {
                if (window.ethereum) {
                  const currentChainId = await window.ethereum.request({
                    method: 'eth_chainId',
                  });
              
                  if (currentChainId === "0x1" || currentChainId === "0x89") {
                    if(currentChainId === "0x1" || currentChainId === "0x89") {
                        setComingSoonNetworkNotificationVisible(true)
                        setTimeout(() => {
                          setComingSoonNetworkNotificationVisible(false)
                        }, 5000);
                      }
                  }
                  else {
                      if(address && msg && amount) {
                        if(address !== account) {
                            if(msg && msg.length >= 10) {
                                try{
                                    await contract.sendGift(address, msg, {value: ethers.utils.parseEther(amount)});
                                    console.log("Sent successfully");
                                    setSendGiftNotificationVisible(true)
                                    setTimeout(() => {
                                        setSendGiftNotificationVisible(false)
                                    }, 5000);
                                } catch(error) {
                                    console.log(error)
                                    if(error.code === 32000)    
                                        alert("Please wait a bit before sending again!")
                                    else {
                                        setInvalidDataNotificationVisible(true)
                                        setTimeout(() => {
                                            setInvalidDataNotificationVisible(false)
                                        }, 5000);
                                    }
                                }
                            } else {
                                setShortMsgNotificationVisible(true)
                                setTimeout(() => {
                                    setShortMsgNotificationVisible(false)
                                }, 5000);
                            }
                            
                        } else {
                            setGiftYourselfNotification(true)
                            setTimeout(() => {
                                setGiftYourselfNotification(false)
                            }, 5000);
                        }
                      } else {
                        setInvalidDataNotificationVisible(true)
                        setTimeout(() => {
                            setInvalidDataNotificationVisible(false)
                        }, 5000);
                      }
                  }
                }
            }
            checkNetwork()
        }
        else {
            setUnsupportedNetworkNotification(true)
            setTimeout(() => {
                setUnsupportedNetworkNotification(false)
            }, 5000);
        }
        
    }

    return ( 
        <div className="giftstables">
            <div className="dappcontainer">
                {
                    sendGiftNotificationVisible ? <SendGiftNotification /> : null
                }
                {
                    giftYourselfNotification ? <GiftYourselfNotification /> : null
                }
                {
                    unsupportedNetworkNotification ? <UnsupportedNetworkNotification /> : null
                }
                {
                    comingSoonNetworkNotificationVisible ? <ComingSoonNetworkNotification /> : null
                }
                {
                    invalidDataNotificationVisible ? <InvalidDataNotification /> : null
                }
                {
                    shortMsgNotificationVisible ? <ShortMsgNotification /> : null
                }
                <div className="table">
                    <div className="tableheader">
                        <div className="tabletitle">Gifts Sent</div>
                        <div className="tableinfo">This tables lists all of the gifts that are sent</div>
                    </div>
                    <div className="list">
                        {   
                            !loading ?
                            sentData.length ?
                            sentData.slice(currentSentPage*giftsPerPage, (currentSentPage*giftsPerPage) + giftsPerPage).map((data) => <SentGiftUI key={data.id} to={data.recipient_address} from={data.sender_address} 
                                amount={data.amount.toFixed(4)} msg={data.message} dateTime={data.createdAt} id={data.id} token={data.token} txHash={data.txHash}></SentGiftUI>) :
                            <div className='oops'>No Gifts Sent :(</div> : <div className='oops'>Loading...</div>
                        }
                    </div>
                    <DashBoardPagination totalPages={totalSentPages} setCurrentPage={setCurrentSentPage} currentPage={currentSentPage} ></DashBoardPagination>
                </div>
                <div className="sendgift">
                    <div className="cardheading">Send Gift</div>
                    <div className="card">
                        <div className="cardline">
                            <div className="cardlinelabel">Recipient Address</div>
                            <input className="cardlineinput" autoComplete='off' spellCheck='false' onChange={(e) => {
                                setAddress(e.target.value);
                            }}></input>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Message</div>
                            <textarea className="cardlinemsginput" autoComplete='off' spellCheck='false' maxLength='200' placeholder='(min 10 characters) (max 200 characters)' onChange={(e) => {
                                setMsg(e.target.value);
                            }}></textarea>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Amount</div>
                            <div className='cardlineamtinput'>
                                <input className="amountinput" autoComplete='off' spellCheck='false' onChange={(e) => {
                                    setAmount(e.target.value);
                                }}></input><div className='gifttokenlabel'>{chainSymbols[window.ethereum.networkVersion]}</div>
                            </div>
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
                        {
                            !loading ?
                            receivedData.length ?
                            receivedData.slice(currentReceivedPage*giftsPerPage, (currentReceivedPage*giftsPerPage) + giftsPerPage).map((data) => <ReceivedGiftUI key={data.id} from={data.sender_address} 
                                to={data.recipient_address} msg={data.message} amount={data.amount.toFixed(4)} dateTime={data.createdAt} id={data.id} token={data.token} txHash={data.txHash}></ReceivedGiftUI>) :
                            <div className='oops'>No Gifts Received :(</div> : <div className='oops'>Loading...</div>
                        }
                    </div>
                    <DashBoardPagination totalPages={totalReceivedPages} setCurrentPage={setCurrentReceivedPage} currentPage={currentReceivedPage} ></DashBoardPagination>
                </div>
            </div>
        </div>
     );
}

function DashBoardPagination({totalPages, setCurrentPage, currentPage}) {
    const [currentNumsSet, setCurrentNumsSet] = useState([]);
    const [active, setActive] = useState(1);
  
    useEffect(() => {
        if(totalPages < 3)
            setCurrentNumsSet(Array(totalPages).fill().map((_, idx) => 1 + idx))
        else
            setCurrentNumsSet([1, 2, 3])
    }, [totalPages])
  
    return ( 
        <div className='dapppagination'>

            {/* prev button */}
            <button className='dapppagelabel' onClick={() => {
              if (currentPage > 0) {
                console.log("current page is:", currentPage);
                setCurrentPage(currentPage -1);
                setActive(currentPage);
                if (currentPage+1 === currentNumsSet[0])
                  setCurrentNumsSet(Array(3).fill().map((_, idx) => (currentNumsSet[0] - 1) + idx))
              }   
            }}><i className='fa fa-angle-left'></i></button>

            {/* numbers */}
            <div className='dappnums'>
              {
                currentNumsSet[0] > 1 ? 
                <div className='dappdotsleft'>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                </div> : null
              }
              {
  
                currentNumsSet.map((pageNum) => 
                <button key={pageNum} className={pageNum === active ? 'dappnumactive' : 'dapppagenum'} onClick={() => {
                    setCurrentPage(pageNum - 1);
                    setActive(pageNum);
                    console.log("clicked on", pageNum);
                }}>{pageNum}</button>)
              }
              {
                totalPages > 3 ?
                currentNumsSet[2] < totalPages ? 
                <div className='dappdots'>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                </div> : null : null
              }
  
            </div>

            {/* next button */}
            <button className='dapppagelabel' onClick={() => {
              if (currentPage+1 < totalPages) {
                setCurrentPage(currentPage+1);
                setActive(currentPage+2);
                console.log('current page is:', currentPage+2)
                if (currentPage+1 === currentNumsSet[2])
                  setCurrentNumsSet(Array(3).fill().map((_, idx) => currentNumsSet[1] + idx))
  
              }
            }}><i className='fa fa-angle-right'></i></button>
        </div>
     );
  }

export default GiftsTables;