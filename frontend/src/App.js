import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BlockchainProvider } from "./context/BlockchainContext";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Wallet from "./pages/Wallet";
import Navbar from "./components/Navbar";
import Transactions from "./pages/transactions";
import Mine from "./pages/Mine";

function App() {
  return (
    <BlockchainProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/mine" element={<Mine />} />
        </Routes>
      </Router>
    </BlockchainProvider>
  );
}

export default App;
