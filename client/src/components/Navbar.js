import { Link } from "react-router-dom";

function Navbar({greet}) {
    return ( 
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
              <Link to='/dapp' target="_blank"><button className='appbtn' onClick={greet}>Launch App</button></Link>
            </div>
        </div>
      </nav>
     );
}

export default Navbar;