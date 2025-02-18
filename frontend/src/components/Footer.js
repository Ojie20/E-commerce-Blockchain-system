import React from "react";
import "../styles/Footer.css"; // Import the stylesheet

function Footer() {
  return (
    <div className="foot">
      <p>© {new Date().getFullYear()} Blue Coin. All rights reserved.</p>
    </div>
  );
}

export default Footer;
