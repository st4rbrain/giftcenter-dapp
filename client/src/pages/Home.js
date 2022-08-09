import { useState, useEffect } from 'react';
import TopGift from '../components/TopGifts/TopGift';
import RecentGift from './../components/RecentGifts/RecentGift';
import Navbar from '../components/Navbar';
import './../Home.css';
import Axios from 'axios';
import { ethers } from 'ethers';


function Home({contract}) {
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
      setTotalGifts(res.data[0].length);

      // calculating total amounts that have been gifted
      let total = 0;
      res.data[0].forEach(element => {
        total += element.amount;
      });
      setGiftedAmounts(total.toFixed(4));

      setTotalPages(Math.ceil(res.data[0].length / 8));
    });
  }, []);

  useEffect(() => {
      contract.on("Gifted", (count, from, to, msg, amt, time) => {

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
              withdrawn: false
          }).then((res) => {
            console.log("Added a new gift!!");
            window.location.reload(true);
        });

        }

        console.log("Posting gift to the database");
        postGift();
      });

      return () => contract.removeAllListeners("Gifted");
  }, [contract]);
  

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
                <TopGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} dateTime={gift.createdAt} />)
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
                <RecentGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} dateTime={gift.createdAt} />
                )
              }
              </div>
              <div className='recentGiftsLine'>
              {
                allGifts.slice((currentPage*giftsperpage)+giftsperpage/2, (currentPage*giftsperpage)+giftsperpage).map((gift) => 
                <RecentGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} dateTime={gift.createdAt} />
                )
              }
              </div>
            </div>

              {/* pagination */}
            <RecentGiftsPagination totalPages={totalPages} setCurrentPage={setCurrentPage}/>

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


function RecentGiftsPagination({totalPages, setCurrentPage}) {
  return ( 
      <div className='pagination'>
          <button className='pagelabel'><i className='fa fa-angle-left'></i>Prev</button>
          <div className='nums'>
              {
              Array(totalPages).fill().map((_, idx) => 1 + idx).map((page) => 
              <button key={page} className='pagenum' onClick={() => {
                  setCurrentPage(page-1);
                  console.log("clicked on", page);
              }}>{page}</button>)
              }
              {/* <button className='pagenum'></button>
              <button className='pagenum'>2</button>
              <button className='pagenum'>3</button>
              <button className='pagenum'>4</button> */}
          </div>
          <button className='pagelabel'>Next<i className='fa fa-angle-right'></i></button>
      </div>
   );
}


export default Home;
