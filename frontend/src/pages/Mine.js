import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

function Mine() {
  const { mineBlue, balance, miningStatus } = useContext(BlockchainContext);

  return (
    <div>
      <h1>⛏️ Mine Blue</h1>
      <h2>Current Balance: {balance} Blue</h2>
      <button onClick={mineBlue}>Start Mining</button>
      {miningStatus && <p>{miningStatus}</p>}
    </div>
  );
}

export default Mine;
