import { useState, useEffect } from 'react';
import RecentGift from './components/RecentGift';
import './App.css';

const ethers = require('ethers');
const GiftCenterABI = [
  "event Gifted(address from, address to, string message, uint amount, uint time)"
];

function App() {

  const [index, setIndex] = useState(0);
  const [allGifts, setAllGifts] = useState([]);


  useEffect(() => {

    const changeTimeFormat = async (time) => {
      const milliseconds = time * 1000;
      const dateObject = new Date(milliseconds);
      const humanDateFormat = dateObject.toLocaleString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'});
      return humanDateFormat;
    }


    const listNewGift = async () => {
      const url = 'https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco';
      const giftcenterAddress = '0x3ecF480fC90568D29b6d359962c5c7dA9D26BBA1';
      const provider = new ethers.providers.JsonRpcProvider(url);
  
      const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, provider);
  
      contract.on("Gifted", (from, to, msg, value, time) => {
  
        const formattedValue = ethers.utils.formatEther(value, 18);
        const dateOfCreation = changeTimeFormat(time);
        
  
        setAllGifts([...allGifts, {
          id: index,
          from: from,
          to: to,
          amount: String(formattedValue),
          time: dateOfCreation
        }]);
  
        console.log(allGifts);
        setIndex(index+1);
      });
    }
  
    listNewGift();

  });
  

  return (
    <div>
      <nav className="navbar">
        <div className="container">
            <div className="logo">GiftCenter</div>
            <ul className="nav">
                <li>
                    <a href="./">Home</a>
                </li>
                <li>
                    <a href="./">About</a>
                </li>          
                <li>
                    <a href="/">Blog</a>
                </li>
            </ul>
            <div>
              <button className='appbtn'>Launch App</button>
            </div>
        </div>
      </nav>
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
          <div className='topgifts'>
            <div className='title'><h1>Top Gifted Amounts</h1></div>
            <div className='gifts'>
              {/* <div className='gift'>
                <div className='giftline'>
                  <div className='label'>From</div>
                  <div className='giftdata'>0x5a8e9D4B757646097366f978999c79ef87228A99</div>
                </div>
                <div className='giftline'>
                  <div className='label'>To</div>
                  <div className='giftdata'>0x5a8e9D4B757646097366f978999c79ef87228A99</div>
                </div>
                <div className='giftline'>
                  <div className='label'>Amount</div>
                  <div className='giftdata'>0000000</div>
                </div>
              </div> */}
            </div>
          </div>
          <div className='dailygifts'>
            <div className='title'><h1>Latest Gifts</h1></div>
            <div className='gifts' id="allgifts">
              {
                allGifts.map((gift) => <RecentGift key={index} from={gift.from} to={gift.to} amount={gift.amount} />)
              }
            </div>
            <div className='pagination'>
              <button className='pagelabel'><i className='fa fa-angle-left'></i>Prev</button>
              <div className='nums'>
                <button className='pagenum'>1</button>
                <button className='pagenum'>2</button>
                <button className='pagenum'>3</button>
                <button className='pagenum'>4</button>
              </div>
              <button className='pagelabel'>Next<i className='fa fa-angle-right'></i></button>
            </div>
          </div>
        </div>
      </section>
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

export default App;
