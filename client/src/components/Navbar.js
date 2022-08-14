import { Link } from "react-router-dom";

function Navbar({greet}) {
    return ( 
        <nav className="navbar">
        <div className="container">
            <div className="sitenav">
                <div className="logo"></div><div className="sitetitle">GiftCenter</div>
            </div>
            
            <div className="links">
                <ul className="nav">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="#aboutdiv">About</a>
                    </li>          
                </ul>
                <div>
                    <Link to='/dapp' target="_blank"><button className='appbtn' onClick={greet}>Launch App</button></Link>
                </div>
            </div>
        </div>
      </nav>
     );
}

export default Navbar;