import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import "../styles/Mine.css"; // Import the CSS file

function Mine() {
  const { mineBlue, balance, miningStatus } = useContext(BlockchainContext);

  return (
    <div className="mine-container">
      <h1>Mine <span className="blue-text text-lighten-1">B</span>lue ⛏️</h1>
      
      <h2>Current Balance: {balance} Blue 🪙</h2><br/>
      <button onClick={mineBlue}>Start Mining</button>
      {miningStatus && <p>{miningStatus}</p>}
    </div>
  );
}

export default Mine;
