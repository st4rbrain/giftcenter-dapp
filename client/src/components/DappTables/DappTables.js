import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import ReceivedGiftUI from '../dappReceivedGift';
import SentGiftUI from '../dappSentGift';
import './DappTables.css';

  
function GiftsTables({contract, sentData, receivedData, allowedToSend}) {

    const [address, setAddress] = useState();
    const [msg, setMsg] = useState();
    const [amount, setAmount] = useState();

    const giftsPerPage = 3;

    const totalSentPages = Math.ceil(sentData.length / giftsPerPage)
    const totalReceivedPages = Math.ceil(receivedData.length / giftsPerPage)
    const [currentSentPage, setCurrentSentPage] = useState(0);
    const [currentReceivedPage, setCurrentReceivedPage] = useState(0);
        
    const sendgift = async () => {
        if(allowedToSend) {
            try{
                await contract.sendGift(address, msg, {value: ethers.utils.parseEther(amount)});
                console.log("Sent successfully");
            } catch(error) {
                console.log(error)
            }
        }
        else
            alert("Please switch network!!")
        
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
                            sentData.slice(currentSentPage*giftsPerPage, (currentSentPage*giftsPerPage) + giftsPerPage).map((data) => <SentGiftUI key={data.id} to={data.recipient_address} amount={data.amount} dateTime={data.createdAt}></SentGiftUI>)
                        }
                    </div>
                    <DashBoardPagination totalPages={totalSentPages} setCurrentPage={setCurrentSentPage} currentPage={currentSentPage} ></DashBoardPagination>
                </div>
                <div className="sendgift">
                    <div className="cardheading">Send Gift</div>
                    <div className="card">
                        <div className="cardline">
                            <div className="cardlinelabel">Recipient Address</div>
                            <input className="cardlineinput" id="address" autoComplete='off' spellCheck='false' onChange={(e) => {
                                setAddress(e.target.value);
                            }}></input>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Message</div>
                            <textarea className="cardlinemsginput" id="message" autoComplete='off' spellCheck='false'maxLength='200' onChange={(e) => {
                                setMsg(e.target.value);
                            }}></textarea>
                        </div>
                        <div className="cardline">
                            <div className="cardlinelabel">Amount</div>
                            <input className="cardlineinput" id="amount" autoComplete='off' spellCheck='false' onChange={(e) => {
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
                        {
                            receivedData.slice(currentReceivedPage*giftsPerPage, (currentReceivedPage*giftsPerPage) + giftsPerPage).map((data) => <ReceivedGiftUI key={data.id} from={data.sender_address} amount={data.amount} dateTime={data.createdAt}></ReceivedGiftUI>)
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
                if (currentNumsSet[0] !== 1)
                  setCurrentNumsSet(Array(3).fill().map((_, idx) => (currentNumsSet[0] - 1) + idx))
              }   
            }}><i className='fa fa-angle-left'></i></button>

            {/* numbers */}
            <div className='dappnums'>
              {
                currentNumsSet.length >= 3 ?
                currentNumsSet[0] > 1 ? 
                <div className='dappdotsleft'>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                  <div className='dappdot'>.</div>
                </div> : null : null
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
                currentNumsSet.length >= 3 ?
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
                if (currentPage+2 >= 4)
                  setCurrentNumsSet(Array(3).fill().map((_, idx) => currentNumsSet[1] + idx))
  
              }
            }}><i className='fa fa-angle-right'></i></button>
        </div>
     );
  }

export default GiftsTables;