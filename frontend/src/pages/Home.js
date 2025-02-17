import { Link } from "react-router-dom";
import { useContext } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import "../styles/Home.css"; // Import external CSS file

const Home = () => {
  const { balance } = useContext(BlockchainContext);

  return (
    <div className="home-container">
      {/* Content area */}
      <div className="overlay-content white-text">
        <h1 className="h1">
          🛒 Welcome to <span className="blue-text text-lighten-2">Blue Marketplace</span>
        </h1>
        <p>
          Earn and spend <strong>Blue</strong>, our blockchain-based currency!
        </p>
        

        {/* Explore Marketplace Button */}
        <Link to="/marketplace" className="btn-large blue darken-2 waves-effect waves-light">
          🏪 Explore Marketplace
        </Link>
      </div>
    </div>
  );
};

export default Home;
