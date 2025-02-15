import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

function Mine() {
  const { mineBlue, balance } = useContext(BlockchainContext);

  return (
    <div>
      <h1>⛏️ Mine Blue</h1>
      <h2>Current Balance: {balance} Blue</h2>
      <button onClick={mineBlue}>Start Mining</button>
    </div>
  );
}

export default Mine;
