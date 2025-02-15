import React, { useState } from "react";
import axios from "axios";

const MineBlock = () => {
  const [message, setMessage] = useState("");

  const mineBlock = async () => {
    const response = await axios.get("http://localhost:3001/mine");
    setMessage(response.data.note);
  };

  return (
    <div>
      <h2>Mine Blue Coins</h2>
      <button onClick={mineBlock}>Mine</button>
      <p>{message}</p>
    </div>
  );
};

export default MineBlock;
