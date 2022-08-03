import "./Dapp.css";
import GiftsTables from "../components/DappTables/DappTables";

function Dapp({contract, provider}) {
    return ( 
        <div>
            <header className="dappheader">
                <div className="dappcontainer">
                    <div className="top">
                        <div className="logo">GiftCenter</div>
                        <div><button className="connectbtn">Connect Wallet</button></div>
                    </div>
                    <div className="details">
                        <div className="box">
                            <div className="boxtitle">Balance</div>
                            <div className="data">Currently there is no balance in this account</div>
                        </div>
                        <div className="box">
                            <div className="boxtitle">Sent Gifts Data</div>
                            <div className="data">This shows the data of all the gifts that have been sent</div>
                        </div>
                        <div className="box">
                            <div className="boxtitle">Received Gifts Data</div>
                            <div className="data">This shows the data of all the gifts that have been reveived</div>
                        </div>
                    </div>
                </div>
            </header>
            <GiftsTables />
        </div>
    );
}

export default Dapp;