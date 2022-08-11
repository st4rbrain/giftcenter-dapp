import { useState, useEffect } from 'react';
import TopGift from '../components/TopGifts/TopGift';
import RecentGift from './../components/RecentGifts/RecentGift';
import Navbar from '../components/Navbar';
import './../Home.css';
import Axios from 'axios';
import { ethers } from 'ethers';


// const chainSymbols = {
//   80001 : "mMATIC",
//   1 : "ETH",
//   137: "MATIC",
//   5: "GoreliETH"
// }


function Home({contracts}) {
  const [topGifts, setTopGifts] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [giftedAmounts, setGiftedAmounts] = useState();
  const [totalGifts, setTotalGifts] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const giftsperpage = 8;

  useEffect(() => {
      Axios.get("http://localhost:3001/gifts/getGifts").then((res) => {
      setAllGifts(res.data[0]);
      setTopGifts(res.data[1]);
      let k = 0;
      const giftsCounter = setInterval(() => { 
          k += 1;
          setTotalGifts(k)
          if (k === res.data[0].length) {
            clearInterval(giftsCounter)
          }
      }, 70);

      setTotalGifts(res.data[0].length);

      // calculating total amounts that have been gifted
      let total = 0;
      res.data[0].forEach(element => {
        total += element.amount;
      });

      let i = 0;
      const counter = setInterval(() => {
        i += 0.01
        setGiftedAmounts(i.toFixed(4))
        if (i.toFixed(2) === total.toFixed(2)) {
          clearInterval(counter)
        }
      }, 1);

      
      setTotalPages(Math.ceil(res.data[0].length / giftsperpage));
    });
  }, []);


  useEffect(() => {

    //for polygon mumbai
      contracts[80001].on("Gifted", (count, from, to, msg, amt, time) => {

        const formattedAmt = ethers.utils.formatEther(amt);
        const date = new Date(time*1000);
        const amtToFloat = parseFloat(formattedAmt);
        const newId = Number(count);

        const postGift = async () => {
          await Axios.post('http://localhost:3001/gifts/postGifts', {
              id: newId, 
              sender_address: from,
              recipient_address: to,
              message: msg,
              amount: amtToFloat,
              createdAt: date,
              withdrawn: false,
              token: "mMATIC"
          }).then((res) => {
            console.log("Added a new gift!!");
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
          await Axios.post('http://localhost:3001/gifts/postGifts', {
              id: newId, 
              sender_address: from,
              recipient_address: to,
              message: msg,
              amount: amtToFloat,
              createdAt: date,
              withdrawn: false,
              token: "GoreliETH"
          }).then((res) => {
            console.log("Added a new gift!!");
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
          <div className="container">
              <div className="hero">
                <h5>Welcome to the </h5>
                <h1>Gifting Service</h1>
                <h5>built on top of the Blockchain</h5>
              </div>
              <div className='headimg'>
              </div>
          </div>
      </header>
      {/* show the gift records */}
      
      <section className='giftlist'>
        <div className='container'>
        <div className='alldata'>
          <div className='homedataline'>
            <div className='homedatalabel'>Total Amounts Gifted</div>
            <div className='homedatavalue'>{giftedAmounts}</div>
          </div>
          <div className='homedataline'>
            <div className='homedatalabel'>Total Gifts Sent</div>
            <div className='homedatavalue'>{totalGifts}</div>
          </div>
      </div>
          <div className='giftheading'>
            <div className='gftheader'>
              Gifted Items
            </div>
            <div className='gftdesc'>
              This is a record of all the gifts that have been sent over the past decade
            </div>
          </div>

          {/* topgifts listing  */}
          <div className='topgifts'>
            <div className='title'><h1>Top Gifts</h1></div>
            <div className='gifts'>
              {
                topGifts.map((gift) => 
                <TopGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} token={gift.token} dateTime={gift.createdAt} />)
              }
            </div>
          </div>

          {/* dailygifts listing  */}
          <div className='dailygifts'>
            <div className='title'><h1>Latest Gifts</h1></div>
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
              setActive(currentPage);
              if (currentNumsSet[0] !== 1)
                setCurrentNumsSet(Array(5).fill().map((_, idx) => (currentNumsSet[0] - 1) + idx))
            }   
          }}><i className='fa fa-angle-left'></i>Prev</button>
          <div className='nums'>
            {
              currentNumsSet.length >= 5 ?
              currentNumsSet[0] > 1 ? 
              <div className='dotsleft'>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
                <div className='dot'>.</div>
              </div> : null : null
            }
            {

              currentNumsSet.map((pageNum) => 
              <button key={pageNum} className={pageNum === active ? 'active' : 'pagenum'} onClick={() => {
                  setCurrentPage(pageNum - 1);
                  setActive(pageNum);
                  console.log("clicked on", pageNum);
              }}>{pageNum}</button>)
            }
            {
              currentNumsSet.length >=5 ?
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
              if (currentPage+2 >= 6)
                setCurrentNumsSet(Array(5).fill().map((_, idx) => currentNumsSet[1] + idx))

            }
          }}>Next<i className='fa fa-angle-right'></i></button>
      </div>
   );
}


export default Home;
