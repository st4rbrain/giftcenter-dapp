import Home from "./pages/Home";
import Dapp from "./pages/Dapp";
import {ethers} from 'ethers';
import { Route, Routes} from 'react-router-dom';

const GiftCenterABI = [
  "function sendGift(address _recipient, string memory _message) public payable",
  "function setAccount(address _account) external",
  "event currentAccount(address account)",
  "event Gifted(uint count, address from, address to, string message, uint amount, uint time)",
  "event withDrawal(address from, uint amount)"
];


const contractAddresses = {
  80001: process.env.REACT_APP_POLYGON_MUMBAI_CONTRACT_ADDRESS,
  5: "0xA83DC56a158C36C22c3A457EDe8396A289Cfca0c",
}

const rpcURLs = {
  80001: process.env.POLYGON_MUMBAI_NODE_API,
  5: process.env.REACT_APP_GORELI_TESTNET_NODE_API,
  137: process.env.REACT_APP_POLYGON_NODE_API,
  1: process.env.REACT_APP_ETHEREUM_NODE_API
}

const contracts = {

}

for (const key in contractAddresses) {
  const provider = new ethers.providers.JsonRpcProvider(rpcURLs[key])
  const contract = new ethers.Contract(contractAddresses[key], GiftCenterABI, provider)
  contracts[key] = contract
}


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home contracts={contracts}/>}></Route>
        <Route path="/dapp" element={<Dapp contracts={contracts} />}></Route>
      </Routes>
    </>
  );
}

export default App;
