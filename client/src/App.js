import Home from "./pages/Home";
import Dapp from "./pages/Dapp";
import { Route, Routes} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dapp" element={<Dapp />}></Route>
      </Routes>
    </>
  );
}

export default App;
