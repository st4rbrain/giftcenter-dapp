import { useState, useEffect } from 'react';
import './App.css';

function App() {
  return (
    <div className='outerbox'>
      <div className="App">
        <p className="heading">GiftCenter</p>
        <div>
          <p className='subhead'>A place to show some love to your friends and family through the blockchain technology</p>
        </div>
        <div className='datafield'>
          <div className='label'>Recipient Address:</div> 
          <input className='addinput' type="text" name='address'></input>
          <div className='label'>Message:</div>
          <textarea name='msg' className='msginput' rows="6" cols="65"></textarea>
          <div className='label'>Amount:</div>
          <div><input className='amtinput' type="text" name='amount'></input></div>
          <button className='sendGift' onClick={() => {}}>Send Gift</button>
        </div>
      </div>
    </div>
  );
}

export default App;
