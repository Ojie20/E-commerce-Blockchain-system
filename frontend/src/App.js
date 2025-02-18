import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { BlockchainProvider } from "./context/BlockchainContext";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Wallet from "./pages/Wallet";
import M from "materialize-css/dist/js/materialize.min.js";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Transactions from "./pages/transactions";
import Mine from "./pages/Mine";
import Purchases from "./pages/Purchases";

function App() {
  useEffect(() => {
    M.AutoInit(); // Automatically initializes Materialize components
  }, []);

  return (
    <BlockchainProvider>
      <Router>
        <RouterWrapper />
      </Router>
    </BlockchainProvider>
  );
}

function RouterWrapper() {
  const location = useLocation(); // This is now inside Router

  return (
    <>
      {/* Conditionally render Navbar based on the current route */}
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
      {location.pathname == "/marketplace" && <Footer />}
    </>
  );
}

export default App;
