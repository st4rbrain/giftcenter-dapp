import { Link } from "react-router-dom";

function Navbar({greet}) {
    return ( 
        <nav className="navbar">
        <div className="container">
            <div className="logo">GiftCenter</div>
            <div className="links">
                <ul className="nav">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="#numberdata">About</a>
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