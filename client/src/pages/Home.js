import { useState, useEffect } from 'react';
import TopGift from '../components/TopGifts/TopGift';
import RecentGift from './../components/RecentGifts/RecentGift';
import Navbar from '../components/Navbar';
import './../Home.css';
import Axios from 'axios';
import { ethers } from 'ethers';


function Home({contracts}) {
  const [topGifts, setTopGifts] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [giftedmMATIC, setGiftedmMATIC] = useState();
  const [giftedGoreliETH, setGiftedGoreliETH] = useState()
  const [totalGifts, setTotalGifts] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const giftsperpage = 8;

  const fetchData = async() => {
      await Axios.get("https://giftcenter-gamma.herokuapp.com/gifts/getGifts").then((res) => {
      setAllGifts(res.data[0]);
      setTopGifts(res.data[1]);

      let k = res.data[0].length - 11;
      const giftsCounter = setInterval(() => { 
          k += 1;
          setTotalGifts(k)
          if (k === res.data[0].length) {
            clearInterval(giftsCounter)
          }
      }, 100);

      setTotalGifts(res.data[0].length);

      // calculating total amounts that have been gifted
      let totalGoreliETH = 0;
      let totalmMATIC = 0;
      res.data[0].forEach(element => {
        if(element.token === "GoreliETH")
          totalGoreliETH += element.amount;
        else
          totalmMATIC += element.amount
      });

      let i = totalmMATIC - 0.0100;
      let j = totalGoreliETH - 0.0100;
      const counter = setInterval(() => {
        i += 0.0001
        j += 0.0001
        setGiftedmMATIC(i.toFixed(4))
        setGiftedGoreliETH(j.toFixed(4))
        if (i.toFixed(4) === totalmMATIC.toFixed(4)) {
          clearInterval(counter)
        }
      }, 10);
      
      setTotalPages(Math.ceil(res.data[0].length / giftsperpage));
    });
  }
  useEffect(() => {
      fetchData()
  }, []);

  const countingData = () => {
    let k = allGifts.length - 11;
      const giftsCounter = setInterval(() => { 
          k += 1;
          setTotalGifts(k)
          if (k === allGifts.length) {
            clearInterval(giftsCounter)
          }
      }, 100);

      setTotalGifts(allGifts.length);

      // calculating total amounts that have been gifted
      let totalGoreliETH = 0;
      let totalmMATIC = 0;
      allGifts.forEach(element => {
        if(element.token === "GoreliETH")
          totalGoreliETH += element.amount;
        else
          totalmMATIC += element.amount
      });

      let i = totalmMATIC - 0.0100;
      let j = totalGoreliETH - 0.0100;
      const counter = setInterval(() => {
        i += 0.0001
        j += 0.0001
        setGiftedmMATIC(i.toFixed(4))
        setGiftedGoreliETH(j.toFixed(4))
        if (i.toFixed(4) === totalmMATIC.toFixed(4)) {
          clearInterval(counter)
        }
      }, 10);
  }

  useEffect(() => {

    //for polygon mumbai
      contracts[80001].on("Gifted", (count, from, to, msg, amt, time, event) => {

        const formattedAmt = ethers.utils.formatEther(amt);
        const date = new Date(time*1000);
        const amtToFloat = parseFloat(formattedAmt);
        const newId = Number(count);

        const postGift = async () => {
          await Axios.post('https://giftcenter-gamma.herokuapp.com//gifts/postGifts', {
              id: newId, 
              sender_address: from,
              recipient_address: to,
              message: msg,
              amount: amtToFloat,
              createdAt: date,
              withdrawn: false,
              token: "mMATIC",
              txHash: event.transactionHash
          }).then((res) => {
            window.location.reload(true);
        });

        }
        postGift();
      });
      
    return () => {
      contracts[80001].removeAllListeners("Gifted");
    } 
  }, [contracts]);


  useEffect(() => {

    //for goreli testnet
      contracts[5].on("Gifted", (count, from, to, msg, amt, time) => {

        const formattedAmt = ethers.utils.formatEther(amt);
        const date = new Date(time*1000);
        const amtToFloat = parseFloat(formattedAmt);
        const newId = Number(count);

        const postGift = async () => {
          await Axios.post('https://giftcenter-gamma.herokuapp.com/gifts/postGifts', {
              id: newId, 
              sender_address: from,
              recipient_address: to,
              message: msg,
              amount: amtToFloat,
              createdAt: date,
              withdrawn: false,
              token: "GoreliETH"
          }).then((res) => {
            window.location.reload(true);
        });

        }
        postGift();
      });
      
    return () => {
      contracts[5].removeAllListeners("Gifted");
    } 
  }, [contracts]);
  

  const getWelcomed = () => {
    console.log ("Welcome to the App!")
  }

  return (
    <div>
      {/* show navbar */}
      <Navbar greet={getWelcomed} />

      {/* giftcenter header */}
      <header className="header">
          <div className="container" onMouseLeave={allGifts.length ? countingData : null}>
              <div className="hero">
                <h5>Welcome to the </h5>
                <h1>Gifting Service</h1>
                <h5>built on top of the Blockchain</h5>
              </div>
              <div className='headimg'>
              </div>
          </div>
      </header>

      {/* show all the data */}
      <section className='giftcenterdata' id='aboutdiv'>
        <div className='about'>
          <div className='giftheading'>
            <div className='gftheader'>
              About
            </div>
            <div className='gftdesc'>
              This is a gifting service that is built on the Blockchain.<br></br>
              It can also be used as a <i>stylish</i> Crypto Transfer service.<br></br><br></br>
              Currently it supports the transfer on native tokens on the<br></br> <b>Ethereum</b> and 
              <b> Polygon</b> testnets.<br></br><br></br>
              You can transfer <b>GoreliETH</b> and <b>mMATIC</b> tokens right now.<br></br>
              Support for the transfer of Mainnet native tokens<br></br> <b>ETH</b> and <b>MATIC</b> is coming soon.
              
            </div>
          </div>
        </div>
        <div className='alldata'>
          <div className='giftedamounts'>
              <div className='giftedamountshead'>Amounts Gifted</div>
              <div className='giftedamountsdata'>
                <div className='giftedamountdataline'>
                  <div className='homedatalabel'>GoreliETH</div>
                  <div className='homedatavalue'>{giftedGoreliETH}</div>
                </div>
                <div className='giftedamountdataline'>
                  <div className='homedatalabel'>mMATIC</div>
                  <div className='homedatavalue'>{giftedmMATIC}</div>
                </div>
              </div>
          </div>
          <div className='totalgifts'>
              <div className='totalgiftshead'>Total Gifts</div>
              <div className='totalgiftsdata'>{totalGifts}</div>
          </div>
        </div>
      </section>

      {/* show the gift records */}
      <section className='giftlist'>
        <div className='container'>
          <div className='giftheading'>
            <div className='gftheader'>
              Gifts Listing
            </div>
            <div className='gftdesc'>
              This is the listing of all the gifts that are being sent over the currently supported Networks
            </div>
          </div>

          {/* topgifts listing  */}
          <div className='topgifts'>
            <div className='title'><h1>Top Five Gifts</h1></div>
            <div className='gifts'>
              {
                topGifts.map((gift) => 
                <TopGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} token={gift.token} dateTime={gift.createdAt} />)
              }
            </div>
          </div>

          {/* dailygifts listing  */}
          <div className='dailygifts'>
            <div className='title'><h1>All Gifts</h1></div>
            <div className='gifts'>
              <div className='recentGiftsLine'>
              {
                allGifts.slice(currentPage*giftsperpage, (currentPage*giftsperpage)+giftsperpage/2).map((gift) => 
                <RecentGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} token={gift.token} dateTime={gift.createdAt} />
                )
              }
              </div>
              <div className='recentGiftsLine'>
              {
                allGifts.slice((currentPage*giftsperpage)+giftsperpage/2, (currentPage*giftsperpage)+giftsperpage).map((gift) => 
                <RecentGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} token={gift.token} dateTime={gift.createdAt} />
                )
              }
              </div>
            </div>

              {/* pagination */}
            <RecentGiftsPagination totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />

          </div>
        </div>
      </section>

      {/* footer */}
      <footer className='footer'>
        <div className='container'>
          <div className='footdesc'>
            <div>Gifts are a great way to show that you care.</div>
            <div>No matter what's the occasion, a gift is always appreciated.</div>
          </div>
          <div className='foothead'>
            <div>Send a Gift</div>
            <div className='andtxt'>and</div>
            <div>Make Someone's Day Special</div>
          </div>
        </div>
      </footer>

    </div>
  );
}


function RecentGiftsPagination({totalPages, setCurrentPage, currentPage}) {
  const [currentNumsSet, setCurrentNumsSet] = useState([]);
  const [active, setActive] = useState(1);

  useEffect(() => {
    if(totalPages < 5)
      setCurrentNumsSet(Array(totalPages).fill().map((_, idx) => 1 + idx))
    else
      setCurrentNumsSet([1, 2, 3, 4, 5])
  }, [totalPages])

  return ( 
      <div className='pagination'>
          <button className='pagelabel' onClick={() => {
            if (currentPage > 0) {
              setCurrentPage(currentPage -1);
              setActive(currentPage);  //mapped to pagenum that is 1 unit ahead
              if (currentPage+1 === currentNumsSet[0])
                setCurrentNumsSet(Array(5).fill().map((_, idx) => (currentNumsSet[0] - 5) + idx))
            }   
          }}><i className='fa fa-angle-left'></i>Prev</button>
          <div className='nums'>
            {
              currentNumsSet[0] > 1 ? 
              <div className='dotsleft'>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
              </div> : null
            }
            {

              currentNumsSet.map((pageNum) => 
              <button key={pageNum} className={pageNum === active ? 'active' : 'pagenum'} onClick={() => {
                  setCurrentPage(pageNum - 1);
                  setActive(pageNum);
              }}>{pageNum}</button>)
            }
            {
              totalPages > 5 ?
              currentNumsSet[4] < totalPages ? 
              <div className='dots'>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
              </div> : null : null
            }

          </div>
          <button className='pagelabel' onClick={() => {
            if (currentPage+1 < totalPages) {
              setCurrentPage(currentPage+1);
              setActive(currentPage+2);
              if (currentPage+1 === currentNumsSet[4]) {
                if(totalPages - currentNumsSet[4] < 5) {
                  setCurrentNumsSet(Array(totalPages-currentNumsSet[4]).fill().map((_, idx) => currentNumsSet[4] + idx + 1))
                }
                else {
                  setCurrentNumsSet(Array(5).fill().map((_, idx) => currentNumsSet[4] + idx + 1))
                }
              }
                

            }
          }}>Next<i className='fa fa-angle-right'></i></button>
      </div>
   );
}


export default Home;
