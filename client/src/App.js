import Home from "./pages/Home";
import Dapp from "./pages/Dapp";
import {ethers} from 'ethers';
import { Route, Routes} from 'react-router-dom';

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "function setAccount(address _account) external",
  "event currentAccount(address account)",
  "event Gifted(uint count, address from, address to, string message, uint amount, uint time)"
];


const url = "https://polygon-mumbai.g.alchemy.com/v2/M2y-N2dpx1yQ1CHnLmfxlL5ThnajzQco";
const giftcenterAddress = '0x44B78BdEE21810B87d78178Ba4DE299526e24127';
const provider = new ethers.providers.JsonRpcProvider(url);
const contract = new ethers.Contract(giftcenterAddress, GiftCenterABI, provider);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home contract={contract}/>}></Route>
        <Route path="/dapp" element={<Dapp/>}></Route>
      </Routes>
    </>
  );
}

export default App;
