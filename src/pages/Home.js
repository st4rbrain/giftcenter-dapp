import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentGift from './../components/RecentGifts/RecentGift';
import './../Home.css';

const ethers = require('ethers');
const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "event Gifted(address from, address to, string message, uint amount, uint time)"
];

function Home() {

  const [index, setIndex] = useState(0);
  const [allGifts, setAllGifts] = useState([]);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState();
  const [contractAddress, setContractAddress] = useState();


  useEffect(() => {
    const loadProvider = () => {
      const url = 'https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco';
      const giftcenterAddress = '0x3ecF480fC90568D29b6d359962c5c7dA9D26BBA1';
      const provider = new ethers.providers.JsonRpcProvider(url);
      const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, provider);

      setContract(contract);
      setProvider(provider);
      setContractAddress(giftcenterAddress);
    }
    loadProvider();
  }, []);

  const changeTimeFormat = async (time) => {
    const milliseconds = time * 1000;
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString('en-US', {day: 'numeric', month: 'numeric', year: 'numeric'});
    return humanDateFormat;
  }

  const getBalance = async () => {
    const balanace = await provider.getBalance(contractAddress);
    console.log(`Balance of ${contractAddress} is ${ethers.utils.formatEther(balanace)} MATIC`);
  }
  
  useEffect(() => {
    const listenEvents = async () => {
      contract.on("Gifted", (from, to, msg, amount, time) => {
        setAllGifts([...allGifts, {
          id: index,
          from: from,
          to: to,
          amount: ethers.utils.formatEther(amount),
          time: changeTimeFormat(time),
        }]);
        setIndex(index+1);
      });
    }
    listenEvents();
  });
  

  return (
    <div>
      <nav className="navbar">
        <div className="container">
            <div className="logo">GiftCenter</div>
            <ul className="nav">
                <li>
                    <Link to="./">Home</Link>
                </li>
                <li>
                    <Link to="./">About</Link>
                </li>          
                <li>
                    <Link to="/">Blog</Link>
                </li>
            </ul>
            <div>
              <Link to='/dapp'><button className='appbtn' onClick={getBalance}>Launch App</button></Link>
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
                allGifts.map((gift) => <RecentGift key={gift.id} from={gift.from} to={gift.to} amount={gift.amount} />)
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



export default Home;
