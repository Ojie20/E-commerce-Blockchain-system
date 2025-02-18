import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";

import M from "materialize-css/dist/js/materialize.min.js";


const Navbar = () => {
  useEffect(() => {
    M.Sidenav.init(document.querySelector(".sidenav"));
  }, []);

  return (
    <>
      <nav className="white">
        <div className="nav-wrapper container">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            <img src="/images/icons/logo.png" alt="Logo" className="navbar-logo" width="100%" />
          </Link>

          {/* Mobile Menu Trigger */}
          <a href="#" data-target="mobile-demo" className="sidenav-trigger black-text">
            <i className="material-icons">menu</i>
          </a>

          {/* Desktop Nav Links */}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/" className="black-text">Home</Link></li>
            <li><Link to="/marketplace" className="black-text">Marketplace</Link></li>
            <li><Link to="/wallet" className="black-text">Wallet</Link></li>
            <li><Link to="/transactions" className="black-text">Transactions</Link></li>
            <li><Link to="/mine" className="black-text">Mine</Link></li>
            <li><Link to="/purchases" className="black-text">Purchases</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <ul className="sidenav" id="mobile-demo">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/marketplace">Marketplace</Link></li>
        <li><Link to="/wallet">Wallet</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/mine">Mine</Link></li>
      </ul>

      {/* CSS Styling */}
      <style>
        {`
          .navbar-logo {
            height: 50px;
            margin-top: 8px;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
