import Home from "./pages/Home";
import Dapp from "./pages/Dapp";

function App() {

  let component;
  switch(window.location.pathname) {
    case "/":
      component = <Home />
      break;
    case "/dapp":
      component = <Dapp />
      break;
    default:
      component = <Home />
  }

  return (
    <>
    {component}
    </>
  );
}

export default App;
