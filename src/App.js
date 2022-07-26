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
          <p className='label'>Recipient Address:</p>
          <input type="text" name='address'></input>
          <p className='label'>Message:</p>
          <textarea name='msg' className='msginput' rows="6" cols="35"></textarea>
          <p className='label'>Amount:</p>
          <input type="text" name='amount'></input>
          <button className='sendGift'>Send Gift</button>
        </div>
        <div className='imgdiv'>
        </div>
      </div>
    </div>
  );
}

export default App;
