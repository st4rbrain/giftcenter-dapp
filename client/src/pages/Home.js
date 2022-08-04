import { useState, useEffect } from 'react';
import TopGift from '../components/TopGifts/TopGift';
import RecentGift from './../components/RecentGifts/RecentGift';
import Navbar from '../components/Navbar';
import './../Home.css';
import Axios from 'axios';
import RecentGiftsPagination from '../components/homeGiftsPagination';

const ethers = require('ethers');
const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "event Gifted(uint count, address from, address to, string message, uint amount, uint time)"
];

function Home() {

  const [allGifts, setAllGifts] = useState([]);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const loadProvider = () => {
      const url = "https://small-bold-dream.matic-testnet.discover.quiknode.pro/4e7c4314ce145b2aae49af69f438667ba35f897d/";
      const giftcenterAddress = '0x6b4e288d1a27ffa6f1e4BDc5F5C8804Bfa053062';
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, provider);

      setContract(contract);
      console.log("state changed");
    }
      loadProvider();
  }, []);


  useEffect(() => {
    const listenEvents = async () => {
      console.log("listening to events..");
      contract.on("Gifted", (count, from, to, msg, amt, time) => {

        const formattedAmt = ethers.utils.formatEther(amt);
        const date = new Date(time*1000);
        const amtToFloat = parseFloat(formattedAmt);

        const postGift = async () => {
          await Axios.post('http://localhost:3001/gifts/postGifts', {
            id: Number(count), 
            sender_address: from,
            recipient_address: to,
            message: msg,
            amount: amtToFloat,
            createdAt: date
          }).then((res) => {
            console.log("Added a new gift!!");
            setAllGifts([...allGifts, {
              id: Number(count), 
              sender_address: from,
              recipient_address: to,
              message: msg,
              amount: amtToFloat,
              createdAt: date
            }]);
        });

        }
        console.log("Posting gift to the database");
        postGift();
      });
    }
    contract && listenEvents();
  });
  

  useEffect(() => {
    Axios.get("http://localhost:3001/gifts/getGifts").then((res) => {
      console.log(res.data);
      // setAllGifts(res.data);
      console.log(res.data.length);
    });
  }, []);

  

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
          <div className='giftheading'>
            <div className='gftheader'>
              Gifted Items
            </div>
            <div className='gftdesc'>
              This is a record of all the gifts that have been sent over the past decade
              This is a record of all the gifts that have been sent over the past decade
              This is a record of all the gifts that have been sent over the past decade
            </div>
          </div>

          {/* topgifts listing  */}
          <div className='topgifts'>
            <div className='title'><h1>Top Gifted Amounts</h1></div>
            <div className='gifts'>
              {
                allGifts.map((gift) => <TopGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} dateTime={gift.createdAt} />)
              }
            </div>
          </div>

          {/* dailygifts listing  */}
          <div className='dailygifts'>
            <div className='title'><h1>Latest Gifts</h1></div>
            <div className='gifts' id="allgifts">
              {
                allGifts.map((gift) => <RecentGift key={gift.id} from={gift.sender_address} to={gift.recipient_address} amount={gift.amount} dateTime={gift.createdAt} />)
              }
            </div>

              {/* pagination */}
            <RecentGiftsPagination />

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



export default Home;
