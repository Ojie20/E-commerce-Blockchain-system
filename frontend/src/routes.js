import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Transactions from "./pages/transactions";
import Mine from "./pages/Mine";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/mine" element={<Mine />} />
        <Route path="/purchases" element={<Mine />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
