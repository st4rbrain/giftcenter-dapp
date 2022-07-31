import { useState, useEffect } from 'react';
import './App.css';
const ethers = require('ethers');
// import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';

function App() {

  return (
    <div>
      <nav class="navbar">
        <div class="container">
            <div class="logo">GiftCenter</div>
            <ul class="nav">
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>          
                <li>
                    <a href="#">Blog</a>
                </li>
            </ul>
            <div>
              <button className='appbtn'>Launch App</button>
            </div>
        </div>
      </nav>
      <header class="header">
          <div class="container">
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
        <div class='container'>
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
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
            </div>
          </div>
          <div className='dailygifts'>
            <div className='title'><h1>Latest Gifts</h1></div>
            <div className='gifts'>
            <div className='gift'>
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
              </div>
              <div className='gift'>
                <div className='giftline'>
                  <div className='label'>From</div>
                  <div className='giftdata'>0x5a8e9D4B757646097366f978999c79ef87228A99</div>
                </div>
                <div className='giftline'>
                  <div className='label'>To</div>
                  <div className='giftdata'>Myself</div>
                </div>
                <div className='giftline'>
                  <div className='label'>Amount</div>
                  <div className='giftdata'>0000000</div>
                </div>
              </div>
              <div className='gift'>
                <div className='giftline'>
                  <div className='label'>From</div>
                  <div className='giftdata'>0x5a8e9D4B757646097366f978999c79ef87228A99</div>
                </div>
                <div className='giftline'>
                  <div className='label'>To</div>
                  <div className='giftdata'>Myself</div>
                </div>
                <div className='giftline'>
                  <div className='label'>Amount</div>
                  <div className='giftdata'>0000000</div>
                </div>
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
              <div className='gift'>
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
              </div>
            </div>
            <div className='pagination'>
              <button className='pagelabel'><i class='fa fa-angle-left'></i>Prev</button>
              <div class='nums'>
                <button className='pagenum'>1</button>
                <button className='pagenum'>2</button>
                <button className='pagenum'>3</button>
                <button className='pagenum'>4</button>
              </div>
              <button className='pagelabel'>Next<i class='fa fa-angle-right'></i></button>
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
            <div class='andtxt'>and</div>
            <div>Make Someone's Day Special</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
